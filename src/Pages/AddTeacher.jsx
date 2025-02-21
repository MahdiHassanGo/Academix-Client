import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";
import Navbar from "../components/Navbar";
import Aos from "aos";
import "aos/dist/aos.css";
import { useForm } from "react-hook-form";


const AddTeacher = () => {

  const { user } = useContext(AuthContext);
  const [status, setStatus] = useState(""); 
  const [isTeacher, setIsTeacher] = useState(false);
  const [categories, setCategories] = useState([
    "Web Development",
    "Digital Marketing",
    "Graphic Design",
    "SEO",
    "Data Science"
  ]);
  const [showModal, setShowModal] = useState(false);

  const { register, handleSubmit, reset } = useForm();
  useEffect(() => {
    document.title = "Teach On | Academix";
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/teachers?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.length > 0) {
            const currentStatus = data[0]?.status || "pending";
            setStatus(currentStatus);
            setIsTeacher(currentStatus === "approved");
          } else {
            setStatus(""); 
          }
        })
        .catch((error) => console.error("Error fetching teacher data:", error));
    }
  }, [user?.email]);

  const onSubmit = (data) => {
    const teacherRequest = {
      name: user?.displayName,
      email: user?.email,
      image: data.image || user?.photoURL, 
      experience: data.experience,
      title: data.title,
      category: data.category, 
      status: "pending",
    };

    fetch("http://localhost:5000/teachers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(teacherRequest),
    })
      .then((res) => {
       
        return res.json();
      })
      .then((data) => {
       
        if (data.acknowledged) {
          Swal.fire("Submitted!", "Your application is under review.", "success");
          setStatus("pending"); 
          setShowModal(true); 
          reset();
        } else {
          Swal.fire("Error", "Failed to submit application.", "error");
        }
      })
      .catch((error) => {
        console.error("Submission Error:", error); 
        Swal.fire("Error", "An unexpected error occurred.", "error");
      });
  };

  const handleResubmit = () => {
    setStatus(""); 
  };

  if (isTeacher) {
    return (
      <div>
        <Navbar />
        <div className="text-center mt-40">
          <h1 className="text-3xl font-bold ">You are already a teacher!</h1>
          <p className="text-lg mt-30">Welcome to the teaching community.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg mx-auto mt-40">
      <Navbar />
      {status === "pending" ? (
        <div className="text-center">
          <h1 className="text-3xl font-bold">Your application is under review.</h1>
          <p className="mt-4">Please wait for admin approval.</p>
        </div>
      ) : status === "rejected" ? (
        <div className="text-center">
          <h1 className="text-3xl font-bold">Your application was rejected.</h1>
          <button
            className="mt-4 btn bg-blue-500 text-white"
            onClick={handleResubmit}
          >
            Request Another Review
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 shadow-md rounded-lg"  data-aos="fade-up">
          <h1 className="text-2xl font-bold mb-6 mt-10 dark:text-black">Apply to Teach on Academix</h1>
          <div className="mb-4">
            <label className="block text-sm font-medium dark:text-black">Name</label>
            <input
              type="text"
              value={user?.displayName}
              disabled
              className="input input-bordered w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium dark:text-black">Email</label>
            <input
              type="email"
              value={user?.email}
              disabled
              className="input input-bordered w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium dark:text-black">Profile Image URL</label>
            <input
              type="text"
              {...register("image")}
              placeholder="Enter a new image URL (optional)"
              className="input input-bordered w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium dark:text-black">Experience</label>
            <select {...register("experience", { required: true })} className="input input-bordered w-full">
              <option value="beginner ">Beginner</option>
              <option value="mid-level">Mid-level</option>
              <option value="experienced">Experienced</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium dark:text-black">Title</label>
            <input
              type="text"
              {...register("title", { required: true })}
              placeholder="Enter a title"
              className="input input-bordered w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium dark:text-black">Category</label>
            <select {...register("category", { required: true })} className="input input-bordered w-full">
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn bg-orange-500 text-white w-full mt-4 ">
            Submit Application
          </button>
        </form>
      )}
    </div>
  );
};

export default AddTeacher;
