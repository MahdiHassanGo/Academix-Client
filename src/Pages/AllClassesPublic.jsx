import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Aos from "aos";
import "aos/dist/aos.css";
import Loading from "../components/Loading";

const AllClassesPublic = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3); 
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    document.title = "All Classes | Academix";
  }, []);


  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch("https://b10a12-server-side-mahdi-hassan-go.vercel.app/classes", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const approvedClasses = data.filter(cls => cls.status === "approved");
        setClasses(approvedClasses);
      } catch (error) {
        console.error("Error fetching classes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  const handleEnroll = (classId) => {
    navigate(`/classdetailspublic/${classId}`);
  };

 
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = classes.slice(indexOfFirstItem, indexOfLastItem);

  
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <p><Loading/></p>;

  return (
    <div>
      <Navbar />
      <div className="mt-40 w-11/12 mx-auto mb-10">
        <h1 className="text-3xl font-bold text-center mb-10">All Classes</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-aos="fade-up">
          {currentItems.map((cls) => (
            <div
              key={cls._id}
              className="card bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
            >
              <figure className="relative">
                <img
                  src={cls.image}
                  alt={cls.title}
                  className="w-full h-56 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                  <h2 className="text-xl font-bold text-white dark:text-black">{cls.title}</h2>
                </div>
              </figure>
              <div className="p-6">
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Instructor:</strong> {cls.name}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Price:</strong> ${cls.price}
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  <strong>Description:</strong> {cls.description}
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  <strong>Total Enrolment:</strong> {cls.enrollmentCount || 0}
                </p>
                <div className="flex justify-end">
                  <button
                    onClick={() => handleEnroll(cls._id)}
                    className="btn bg-orange-400 text-white hover:bg-orange-200 transition-colors duration-300"
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          {Array.from({ length: Math.ceil(classes.length / itemsPerPage) }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={`mx-1 px-4 py-2 rounded ${
                currentPage === i + 1
                  ? "bg-orange-400 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AllClassesPublic;