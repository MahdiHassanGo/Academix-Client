import React, { useEffect, useState } from "react";
import { useAuth } from "../provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";
import Loading from "../components/Loading";

const MyEnrolledClass = () => {
  const { user } = useAuth();
  const userEmail = user?.email;
  const navigate = useNavigate();

  const [enrolledClasses, setEnrolledClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = "Enroll Class | Academix";
  }, []);

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    const fetchEnrolledClasses = async () => {
      try {
        const token = localStorage.getItem("access-token");
        if (!token) {
          throw new Error("No authentication token found");
        }

        const response = await fetch(`https://b10a12-server-side-mahdi-hassan-go.vercel.app/enrollments/user/${userEmail}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            navigate("/login");
            throw new Error("Please login to view your enrolled classes");
          }
          const text = await response.text();
          throw new Error(`HTTP ${response.status}: ${text}`);
        }

        const data = await response.json();
        setEnrolledClasses(data);
      } catch (error) {
        console.error("Error fetching enrolled classes:", error);
        setError(error.message || "An error occurred. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (userEmail) {
      fetchEnrolledClasses();
    }
  }, [userEmail, navigate]);

  const handleContinue = (classId) => {
    navigate(`/dashboard/enrolleddetails/${classId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-20">
        <p className="text-red-500 mb-4">{error}</p>
        <button 
          onClick={() => navigate("/login")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Go to Login
        </button>
      </div>
    );
  }

  if (enrolledClasses.length === 0) {
    return (
      <div className="text-center mt-20 dark:text-white">
        <p className="text-lg mb-4">No classes enrolled yet.</p>
        <button 
          onClick={() => navigate('/allclassespublic')}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Browse Classes
        </button>
      </div>
    );
  }

  return (
    <div className="mt-20 w-11/12 mx-auto dark:text-black">
      <h1 className="text-3xl font-bold text-center mb-6 dark:text-white" data-aos="fade-up">
        My Enrolled Classes
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {enrolledClasses.map((enrollment, index) => (
          <div
            key={enrollment._id}
            className="card bg-white shadow-md rounded-lg"
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <figure>
              <img
                src={enrollment.classDetails?.image}
                alt={enrollment.classDetails?.title}
                className="w-full h-32 object-cover"
              />
            </figure>
            <div className="card-body p-4">
              <h2 className="card-title text-lg">{enrollment.classDetails?.title}</h2>
              <p className="text-sm">
                <strong>Price:</strong> ${enrollment.classDetails?.price}
              </p>
              <p className="text-sm">
                <strong>Description:</strong> {enrollment.classDetails?.description}
              </p>
              <p className="text-sm">
                <strong>Instructor:</strong> {enrollment.classDetails?.name}
              </p>
              <div className="card-actions justify-end mt-2">
                <button
                  onClick={() => handleContinue(enrollment.classId)}
                  className="btn btn-sm bg-blue-500 text-white hover:bg-blue-600"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyEnrolledClass;