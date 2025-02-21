import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Aos from "aos";
import "aos/dist/aos.css";
import Loading from "../components/Loading";

const AllClasses = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.title = "All Classes | Academix";
  }, []);

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchClasses = async () => {
    try {
      const token = localStorage.getItem("access-token");
      const response = await fetch("https://b10a12-server-side-mahdi-hassan-go.vercel.app/classes", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setClasses(data);
    } catch (error) {
      console.error("Error fetching classes:", error);
      setError("Failed to fetch classes. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleApprove = async (id) => {
    try {
      const token = localStorage.getItem("access-token");
      const response = await fetch(`https://b10a12-server-side-mahdi-hassan-go.vercel.app/classes/${id}/approve`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to approve class");
      }

      Swal.fire({
        icon: "success",
        title: "Class Approved",
        text: "The class has been approved successfully.",
      });

      fetchClasses();
    } catch (error) {
      console.error("Error approving class:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to approve class. Please try again.",
      });
    }
  };

  const handleReject = async (id) => {
    try {
      const token = localStorage.getItem("access-token");
      const response = await fetch(`https://b10a12-server-side-mahdi-hassan-go.vercel.app/classes/${id}/reject`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to reject class");
      }

      Swal.fire({
        icon: "success",
        title: "Class Rejected",
        text: "The class has been rejected successfully.",
      });

      fetchClasses();
    } catch (error) {
      console.error("Error rejecting class:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to reject class. Please try again.",
      });
    }
  };

  const handleProgress = (id) => {
    navigate(`/dashboard/class-progress/${id}`);
  };

  if (loading) return <p><Loading /></p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="mt-10 w-11/12 mx-auto dark:text-black">
      <h1 className="text-3xl font-bold text-center mb-6 dark:text-white">All Classes</h1>

      {/* Table Container with Overflow */}
      <div className="overflow-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b bg-orange-300 text-white">Title</th>
              <th className="py-2 px-4 border-b bg-orange-300 text-white">Image</th>
              <th className="py-2 px-4 border-b bg-orange-300 text-white">Email</th>
              <th className="py-2 px-4 border-b bg-orange-300 text-white">Description</th>
              <th className="py-2 px-4 border-b bg-orange-300 text-white">Status</th>
              <th className="py-2 px-4 border-b bg-orange-300 text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((cls, index) => (
              <tr
                key={cls._id}
                className="hover:bg-gray-100"
                data-aos="fade-up"
                data-aos-delay={index < classes.length - 2 ? index * 100 : 0}
                data-aos-once="true"
              >
                <td className="py-2 px-4 border-b">{cls.title}</td>
                <td className="py-2 px-4 border-b">
                  <img src={cls.image} alt={cls.title} className="w-16 h-16 object-cover" />
                </td>
                <td className="py-2 px-4 border-b">{cls.email}</td>
                <td className="py-2 px-4 border-b">{cls.description}</td>
                <td className="py-2 px-4 border-b">{cls.status}</td>
                <td className="py-2 px-4 border-b">
                  {cls.status === "pending" && (
                    <>
                      <button
                        onClick={() => handleApprove(cls._id)}
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 mr-2"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(cls._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllClasses;
