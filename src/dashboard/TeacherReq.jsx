import { useState, useEffect } from "react";
import { FaChalkboardTeacher } from "react-icons/fa";
import Swal from "sweetalert2";
import Aos from "aos";
import "aos/dist/aos.css";
import Loading from "../components/Loading";

const TeacherReq = () => {
  useEffect(() => {
    document.title = "Teacher Requests | Academix";
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPendingTeachers = async () => {
    const token = localStorage.getItem("access-token");
    if (!token) {
      setError("Access token missing. Please log in.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/teachers/pending", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setTeachers(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching pending teachers:", error);
      setError("Error fetching teachers");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingTeachers();
  }, []);

  const handleApproveTeacher = async (teacher) => {
    const token = localStorage.getItem("access-token");
    if (!token) {
      Swal.fire({
        icon: "error",
        title: "Authentication Error",
        text: "Please log in again",
      });
      return;
    }

    try {
      const teacherResponse = await fetch(
        `http://localhost:5000/teachers/${teacher.email}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!teacherResponse.ok) {
        throw new Error(`HTTP error! Status: ${teacherResponse.status}`);
      }

      const userResponse = await fetch(
        `http://localhost:5000/users/role/${teacher.email}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ role: "teacher" }),
        }
      );

      if (!userResponse.ok) {
        throw new Error(`HTTP error! Status: ${userResponse.status}`);
      }

      setTeachers(teachers.filter((t) => t._id !== teacher._id));

      Swal.fire({
        icon: "success",
        title: "Teacher Approved",
        text: `${teacher.name} has been approved as a teacher`,
        showConfirmButton: false,
        timer: 1500,
      });

      fetchPendingTeachers();
    } catch (error) {
      console.error("Error approving teacher:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to approve teacher. Please try again.",
      });
    }
  };

  const handleReject = (teacher) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to reject this teacher?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, reject",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem("access-token");
        if (!token) {
          Swal.fire({
            icon: "error",
            title: "Authentication Error",
            text: "Please log in again",
          });
          return;
        }

        try {
          const response = await fetch(
            `http://localhost:5000/teachers/${teacher._id}/reject`,
            {
              method: "PATCH",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (!response.ok) {
            throw new Error(`Error rejecting teacher. Status: ${response.status}`);
          }

          setTeachers(teachers.filter((t) => t._id !== teacher._id));

          Swal.fire({
            icon: "success",
            title: "Rejected",
            text: "Teacher has been rejected",
            showConfirmButton: false,
            timer: 1500,
          });

          fetchPendingTeachers();
        } catch (error) {
          console.error("Error rejecting teacher:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to reject teacher. Please try again.",
          });
        }
      }
    });
  };

  if (loading) return <p><Loading /></p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <div className="flex justify-evenly my-4 dark:text-white">
        <h2 className="text-3xl">Pending Teacher Requests</h2>
        <h2 className="text-3xl">Total Requests: {teachers.length}</h2>
      </div>

      {teachers.length === 0 ? (
        <div className="text-center mt-10 dark:text-white">
          <FaChalkboardTeacher className="text-6xl text-gray-400 mx-auto" />
          <h2 className="text-2xl text-gray-500 mt-4">
            No teacher requests currently.
          </h2>
        </div>
      ) : (
        <div className="overflow-x-auto w-11/12 mx-auto ">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th className="bg-orange-300 text-white"></th>
                <th className="bg-orange-300 text-white">Name</th>
                <th className="bg-orange-300 text-white">Email</th>
                <th className="bg-orange-300 text-white">Status</th>
                <th className="bg-orange-300 text-white">Action</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher, index) => (
                <tr
                  key={teacher._id}
                  data-aos="fade-up"
                  data-aos-delay={`${index * 100}`} 
                >
                  <th>{index + 1}</th>
                  <td>{teacher.name}</td>
                  <td>{teacher.email}</td>
                  <td>{teacher.status}</td>
                  <td>
                    <button
                      onClick={() => handleApproveTeacher(teacher)}
                      className="btn bg-orange-500 btn-sm text-white mr-2"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(teacher)}
                      className="btn btn-ghost btn-sm"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TeacherReq;
