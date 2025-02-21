import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loading from "../components/Loading";

const ClassDetailsPublic = () => {
  const { classId } = useParams();
  const [classData, setClassData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/classes/${classId}`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setClassData(data);
      } catch (error) {
        console.error("Error fetching class details:", error);
        setError("Failed to fetch class details. Please try again later.");
        Swal.fire("Error", "Failed to fetch class details.", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchClassDetails();
  }, [classId]);

  const handleEnroll = () => {
    navigate(`/payment`, { state: { classData } });
  };

  if (loading) return <p><Loading></Loading></p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!classData) return <p>No class data found.</p>;

  return (
    <div>
      <Navbar />
      <div className="mt-40 w-11/12 mx-auto mb-10">
        <h1 className="text-3xl font-bold text-center mb-6 dark:text-white">Class Details</h1>
        <div className="card bg-white shadow-md rounded-lg p-6 dark:text-black flex md:flex-row">
          <figure>
            <img
              src={classData.image}
              alt={classData.title}
              className="w-fit h-66 px-5 object-cover rounded-lg"
            />
          </figure>
          <div className="card-body p-4">
            <h2 className="card-title text-lg">{classData.title}</h2>
            <p className="text-sm"><strong>Name:</strong> {classData.name}</p>
            <p className="text-sm"><strong>Price:</strong> ${classData.price}</p>
            <p className="text-sm"><strong>Description:</strong> {classData.description}</p>
            <p className="text-sm"><strong>Total Enrolment:</strong> {classData.enrollmentCount || 0}</p>
            <div className="card-actions justify-end mt-2">
              <button
                onClick={handleEnroll}
                className="btn btn-lg bg-blue-500 text-white"
              >
                Enroll
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ClassDetailsPublic;