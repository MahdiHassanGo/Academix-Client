import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useAuth } from "../provider/AuthProvider";
import Aos from "aos";
import "aos/dist/aos.css";

const AddClass = () => {
  useEffect(() => {
    document.title = "Add Classes | Academix";
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  const { user } = useAuth();
  const navigate = useNavigate();
  const [status, setStatus] = useState("");
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const classData = {
      title: data.title,
      name: user?.displayName,
      email: user?.email,
      price: data.price,
      description: data.description,
      image: data.image,
      status: "pending",
      submittedBy: user?.email,
    };

    try {
      const response = await fetch("http://localhost:5000/classes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(classData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
    

      Swal.fire({
        icon: "success",
        title: "Class Submitted",
        text: "Your class is under review by the admin.",
      });

      navigate("/dashboard/myclass");
    } catch (error) {
     
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add class. Please try again.",
      });
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto mt-5">
      {status === "pending" ? (
        <div className="text-center" data-aos="fade-up" data-aos-delay="200">
          <h1 className="text-3xl font-bold">Your application is under review.</h1>
          <p className="mt-4">Please wait for admin approval.</p>
        </div>
      ) : status === "rejected" ? (
        <div className="text-center" data-aos="fade-up" data-aos-delay="200">
          <h1 className="text-3xl font-bold">Your application was rejected.</h1>
          <button
            className="mt-4 btn bg-blue-500 text-white"
            onClick={() => setStatus("")}
          >
            Request Another Review
          </button>
        </div>
      ) : (
        <form 
          onSubmit={handleSubmit(onSubmit)} 
          className="bg-white p-6 shadow-md rounded-lg"
          data-aos="fade-up" 
          data-aos-delay="200"
        >
          <h1 className="text-2xl font-bold mb-6 mt-2">Add a New Class</h1>
          
          <div className="mb-4" data-aos="fade-up" data-aos-delay="300">
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              value={user?.displayName}
              disabled
              className="input input-bordered w-full"
            />
          </div>

          <div className="mb-4" data-aos="fade-up" data-aos-delay="400">
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={user?.email}
              disabled
              className="input input-bordered w-full"
            />
          </div>

          <div className="mb-4" data-aos="fade-up" data-aos-delay="500">
            <label className="block text-sm font-medium">Title</label>
            <input
              {...register("title", { 
                required: "Title is required",
                minLength: {
                  value: 3,
                  message: "Title must be at least 3 characters long"
                }
              })}
              type="text"
              placeholder="Enter class title"
              className="input input-bordered w-full"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
          </div>

          <div className="mb-4" data-aos="fade-up" data-aos-delay="600">
            <label className="block text-sm font-medium">Price</label>
            <input
              {...register("price", { 
                required: "Price is required",
                min: {
                  value: 0,
                  message: "Price cannot be negative"
                }
              })}
              type="number"
              placeholder="Enter class price"
              className="input input-bordered w-full"
            />
            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
          </div>

          <div className="mb-4" data-aos="fade-up" data-aos-delay="700">
            <label className="block text-sm font-medium">Description</label>
            <textarea
              {...register("description", { 
                required: "Description is required",
                minLength: {
                  value: 10,
                  message: "Description must be at least 10 characters long"
                }
              })}
              placeholder="Enter class description"
              className="input input-bordered w-full"
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
          </div>

          <div className="mb-4" data-aos="fade-up" >
            <label className="block text-sm font-medium">Image URL</label>
            <input
              {...register("image", { 
                required: "Image URL is required",
                pattern: {
                  value: /^(http|https):\/\/.+/i,
                  message: "Please enter a valid image URL"
                }
              })}
              type="text"
              placeholder="Enter image URL"
              className="input input-bordered w-full"
            />
            {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
          </div>

          <button 
            type="submit" 
            className="btn bg-orange-400 text-white w-full mt-4"
           
          >
            Add Class
          </button>
        </form>
      )}
    </div>
  );
};

export default AddClass;