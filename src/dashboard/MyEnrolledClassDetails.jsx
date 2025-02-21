import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import { toast } from "react-toastify";
import Rating from "react-rating";
import Swal from "sweetalert2";
import Aos from "aos";
import "aos/dist/aos.css";
import Loading from "../components/Loading";

const MyEnrolledClassDetails = () => {
  const { classId } = useParams();
  const { user } = useAuth();
  const [classData, setClassData] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [assignmentLink, setAssignmentLink] = useState("");

  useEffect(() => {
    document.title = "Details | Academix";
  }, []);

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
     

        const classResponse = await fetch(`https://b10a12-server-side-mahdi-hassan-go.vercel.app/classes/${classId}`);
        if (!classResponse.ok) {
          throw new Error(`HTTP error! Status: ${classResponse.status}`);
        }
        const classData = await classResponse.json();
       
        setClassData(classData);

        const assignmentsResponse = await fetch(`https://b10a12-server-side-mahdi-hassan-go.vercel.app/assignments/${classId}`);
        if (!assignmentsResponse.ok) {
          throw new Error(`HTTP error! Status: ${assignmentsResponse.status}`);
        }
        const assignmentsData = await assignmentsResponse.json();
       
        setAssignments(assignmentsData);
      } catch (error) {
        console.error("Error fetching class details:", error);
        toast.error("Failed to fetch class details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (classId) {
      fetchClassDetails();
    }
  }, [classId]);

  const handleSubmitAssignment = async (assignmentId) => {
    try {
      const response = await fetch(`https://b10a12-server-side-mahdi-hassan-go.vercel.app/assignments/${assignmentId}/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          userId: user._id, 
          assignmentLink,
          classId: classData._id 
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      Swal.fire({
        icon: "success",
        title: "Assignment Submitted",
        text: "Your assignment has been submitted successfully!",
      });

      setSubmitModalOpen(false);
      setAssignmentLink("");

      setClassData(prevClassData => ({
        ...prevClassData,
        submissionCount: prevClassData.submissionCount + 1
      }));
    } catch (error) {
      console.error("Error submitting assignment:", error);

      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: error.message || "Failed to submit assignment. Please try again.",
      });
    }
  };

  const handleFeedbackSubmit = async () => {
    try {
      const response = await fetch("https://b10a12-server-side-mahdi-hassan-go.vercel.app/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
          userName: user.name, 
          userPhoto: user.photoURL, 
          classId,
          rating,
          review,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      Swal.fire({
        icon: "success",
        title: "Feedback Submitted",
        text: "Your feedback has been submitted successfully!",
      });

      setFeedbackModalOpen(false);
    } catch (error) {
      console.error("Error submitting feedback:", error);

      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: error.message || "Failed to submit feedback. Please try again.",
      });
    }
  };

  if (loading) return <p><Loading></Loading></p>;

  if (!classData) {
    return <p className="text-center mt-20">Class not found.</p>;
  }

  return (
    <div className="mt-20 w-11/12 mx-auto mb-10 dark:text-black">
    
      <div className="" data-aos="fade-up" data-aos-delay="100">
        <button
          onClick={() => setFeedbackModalOpen(true)}
          className="btn bg-green-500 text-white"
        >
          Teaching Evaluation Report (TER)
        </button>
      </div>

     
      <h1 className="text-3xl font-bold text-center mb-6 dark:text-white" data-aos="fade-up" data-aos-delay="200">
        {classData.title}
      </h1>

    
      <div
        className="card bg-white shadow-md rounded-lg p-4 flex md:flex-row md:p-6 overflow-x-hidden"
        data-aos="fade-up"
        data-aos-delay="300"
      >
        <figure>
          <img
            src={classData.image}
            alt={classData.title}
            className="w-fit h-32 md:h-48 object-cover rounded-lg"
          />
        </figure>
        <div className="card-body p-2">
          <h2 className="card-title text-sm md:text-lg">{classData.title}</h2>
          <p className="text-xs md:text-sm"><strong>Description:</strong> {classData.description}</p>
          <p className="text-xs md:text-sm"><strong>Instructor Name:</strong> {classData.name}</p>
        </div>
      </div>

    
      <div className="mt-10 overflow-x-auto" data-aos="fade-up" data-aos-delay="400">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">Assignments</h2>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Title</th>
              <th className="py-2 px-4 border-b">Description</th>
              <th className="py-2 px-4 border-b">Deadline</th>
              <th className="py-2 px-4 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment, index) => (
              <tr key={assignment._id} data-aos="fade-up" data-aos-delay={500 + index * 100}>
                <td className="py-2 px-4 border-b text-sm md:text-base">{assignment.title}</td>
                <td className="py-2 px-4 border-b text-sm md:text-base">{assignment.description}</td>
                <td className="py-2 px-4 border-b text-sm md:text-base">
                  {new Date(assignment.deadline).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => {
                      setSelectedAssignment(assignment);
                      setSubmitModalOpen(true);
                    }}
                    className="btn btn-sm bg-blue-500 text-white text-xs md:text-sm"
                    disabled={assignment.isSubmitted}
                  >
                    {assignment.isSubmitted ? "Submitted" : "Submit"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

     
      {submitModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-11/12 md:w-1/2" data-aos="fade-up" data-aos-delay="100">
            <h2 className="text-2xl font-bold mb-4">Submit Assignment</h2>
            <p><strong>Title:</strong> {selectedAssignment?.title}</p>
            <p><strong>Description:</strong> {selectedAssignment?.description}</p>
            <p><strong>Deadline:</strong> {new Date(selectedAssignment?.deadline).toLocaleDateString()}</p>
            <input
              type="text"
              className="w-full mt-4 p-2 border rounded"
              placeholder="Your assignment Link"
              value={assignmentLink}
              onChange={(e) => setAssignmentLink(e.target.value)}
            />
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setSubmitModalOpen(false)}
                className="btn btn-sm mr-2"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSubmitAssignment(selectedAssignment._id)}
                className="btn btn-sm bg-orange-500 text-white"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

     
      {feedbackModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-11/12 md:w-1/2" data-aos="fade-up" data-aos-delay="100">
            <h2 className="text-2xl font-bold mb-4">Feedback</h2>
            <Rating
              initialRating={rating}
              onChange={(value) => setRating(value)}
            />
            <textarea
              className="w-full mt-4 p-2 border rounded"
              placeholder="Your review..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setFeedbackModalOpen(false)}
                className="btn btn-sm mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleFeedbackSubmit}
                className="btn btn-sm bg-orange-500 text-white"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyEnrolledClassDetails;