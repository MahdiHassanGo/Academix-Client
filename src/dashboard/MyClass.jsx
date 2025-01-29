import React, { useEffect, useState } from "react";
import { useAuth } from "../provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Aos from "aos";
import "aos/dist/aos.css";
import Loading from "../components/Loading";
const MyClass = () => {
  const { user } = useAuth();
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "My Classes | Academix";
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch(
          `https://server-ecru-nu-72.vercel.app/classes?email=${user?.email}`
        );
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
       
        setClasses(data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchClasses();
  }, [user?.email]);

  
  const handleDelete = async (classId) => {
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmDelete.isConfirmed) {
      try {
        const response = await fetch(`https://server-ecru-nu-72.vercel.app/classes/${classId}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        
        setClasses(classes.filter((cls) => cls._id !== classId));

        Swal.fire("Deleted!", "The class has been deleted.", "success");
      } catch (error) {
        console.error("Error deleting class:", error);
        Swal.fire("Error", "Failed to delete class.", "error");
      }
    }
  };

  
  const handleUpdate = (cls) => {
    setSelectedClass(cls);
    setOpenModal(true);
  };

  
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const updatedClass = {
      title: formData.get("title"),
      price: parseFloat(formData.get("price")),
      description: formData.get("description"),
      image: formData.get("image"),
    };

    try {
      const response = await fetch(
        `https://server-ecru-nu-72.vercel.app/classes/${selectedClass._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedClass),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
     

    
      setClasses(
        classes.map((cls) =>
          cls._id === selectedClass._id ? { ...cls, ...updatedClass } : cls
        )
      );

   
      setOpenModal(false);

      Swal.fire("Success", "Class updated successfully.", "success");
    } catch (error) {
      console.error("Error updating class:", error);
      Swal.fire("Error", "Failed to update class.", "error");
    }
  };


  const handleSeeDetails = (classId) => {
    navigate(`/dashboard/seedetails/${classId}`);
  };

  if (loading) return <p><Loading></Loading></p>;

  if (classes.length === 0) {
    return (
      <div className="mt-15 w-11/12 mx-auto text-center">
        <h1 className="text-3xl font-bold mb-6">My Classes</h1>
        <p>No classes found. Add a new class to get started.</p>
      </div>
    );
  }
  
  return (
    <div className="mt-20 w-11/12 mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6" data-aos="fade-up">My Classes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {classes.map((cls, index) => (
          <div key={cls._id} className="card bg-white shadow-md rounded-lg" data-aos="fade-up" data-aos-delay={`${index * 100}`}>
            <figure>
              <img
                src={cls.image}
                alt={cls.title}
                className="w-full h-32 object-cover"
              />
            </figure>
            <div className="card-body p-4">
              <h2 className="card-title text-lg">{cls.title}</h2>
              <p className="text-sm"><strong>Name:</strong> {cls.name}</p>
              <p className="text-sm"><strong>Email:</strong> {cls.email}</p>
              <p className="text-sm"><strong>Price:</strong> ${cls.price}</p>
              <p className="text-sm"><strong>Description:</strong> {cls.description}</p>
              <p className="text-sm"><strong>Status:</strong> {cls.status}</p>
              <div className="card-actions justify-end mt-2">
                <button
                  onClick={() => handleUpdate(cls)}
                  className="btn btn-sm bg-blue-500 text-white"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(cls._id)}
                  className="btn btn-sm bg-red-500 text-white"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleSeeDetails(cls._id)}
                  className="btn btn-sm bg-green-500 text-white"
                  disabled={cls.status !== "approved"}
                >
                  See Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
  
      {openModal && selectedClass && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-11/12 md:w-1/2" data-aos="fade-up">
            <h2 className="text-2xl font-bold mb-4">Update Class</h2>
            <form onSubmit={handleUpdateSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium">Title</label>
                <input
                  type="text"
                  name="title"
                  defaultValue={selectedClass.title}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Price</label>
                <input
                  type="number"
                  name="price"
                  defaultValue={selectedClass.price}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Description</label>
                <textarea
                  name="description"
                  defaultValue={selectedClass.description}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Image URL</label>
                <input
                  type="text"
                  name="image"
                  defaultValue={selectedClass.image}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setOpenModal(false)}
                  className="btn bg-gray-500 text-white"
                >
                  Cancel
                </button>
                <button type="submit" className="btn bg-blue-500 text-white">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );

};

export default MyClass;