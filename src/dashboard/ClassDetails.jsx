import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Aos from "aos";
import "aos/dist/aos.css";
import Loading from "../components/Loading";
const ClassDetails = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  const { classId } = useParams(); 
  const [classData, setClassData] = useState(null);
  const [totalEnrollment, setTotalEnrollment] = useState(0);
  const [totalAssignments, setTotalAssignments] = useState(0);
  const [submissionCount, setSubmissionCount] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [assignmentTitle, setAssignmentTitle] = useState("");
  const [assignmentDeadline, setAssignmentDeadline] = useState("");
  const [assignmentDescription, setAssignmentDescription] = useState("");
  useEffect(() => {
    document.title = "ClassDetails | Academix";
  }, []);

  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/classes/${classId}`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        
        setClassData(data);
        setTotalEnrollment(data.enrollmentCount || 0);
        setTotalAssignments(data.assignmentCount || 0);
        setSubmissionCount(data.submissionCount || 0);
       
      } catch (error) {
        
        Swal.fire("Error", "Failed to fetch class details.", "error");
      }
    };

    fetchClassDetails();
  }, [classId]);

  const handleAddAssignment = async () => {
    if (!assignmentTitle || !assignmentDeadline || !assignmentDescription) {
      Swal.fire("Error", "Please fill out all fields.", "error");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/assignments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          classId: classId,
          title: assignmentTitle,
          deadline: assignmentDeadline,
          description: assignmentDescription,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setTotalAssignments(totalAssignments + 1);
      setOpenModal(false);

      Swal.fire("Success", "Assignment added successfully.", "success");
    } catch (error) {
      console.error("Error adding assignment:", error);
      Swal.fire("Error", "Failed to add assignment.", "error");
    }
  };

  if (!classData) return <p><Loading></Loading></p>;

  return (
    <div className="mt-35 w-11/12 mx-auto dark:text-black">
      <h1 className="text-5xl font-bold text-center mb-10 dark:text-white" data-aos="fade-up">Class Details</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="card bg-white shadow-lg rounded-lg p-6" data-aos="fade-up" data-aos-delay="100">
          <h2 className="text-xl font-bold">Total Enrollment</h2>
          <p className="text-2xl">{totalEnrollment}</p>
        </div>
        <div className="card bg-white shadow-lg rounded-lg p-6" data-aos="fade-up" data-aos-delay="200">
          <h2 className="text-xl font-bold">Total Assignments</h2>
          <p className="text-2xl">{totalAssignments}</p>
        </div>
        <div className="card bg-white shadow-lg rounded-lg p-6" data-aos="fade-up" data-aos-delay="300">
          <h2 className="text-xl font-bold">Total Submissions</h2>
          <p className="text-2xl">{submissionCount}</p>
        </div>
      </div>
  
      <div className="text-center mb-10" data-aos="fade-up" data-aos-delay="400">
        <button
          onClick={() => setOpenModal(true)}
          className="btn bg-blue-500 text-white"
        >
          Create Assignment
        </button>
      </div>
  
      {openModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-11/12 md:w-1/2" data-aos="fade-up">
            <h2 className="text-2xl font-bold mb-4">Create Assignment</h2>
            <input
              type="text"
              placeholder="Assignment Title"
              value={assignmentTitle}
              onChange={(e) => setAssignmentTitle(e.target.value)}
              className="input input-bordered w-full mb-4"
            />
            <input 
              type="date"
              placeholder="Deadline"
              value={assignmentDeadline}
              onChange={(e) => setAssignmentDeadline(e.target.value)}
              className="input input-bordered w-full mb-4 dark:text-white"
            />
            <textarea
              placeholder="Assignment Description"
              value={assignmentDescription}
              onChange={(e) => setAssignmentDescription(e.target.value)}
              className="input input-bordered w-full mb-4"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setOpenModal(false)}
                className="btn bg-gray-500 text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleAddAssignment}
                className="btn bg-blue-500 text-white"
              >
                Add Assignment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassDetails;