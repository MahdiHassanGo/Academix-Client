import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Aos from "aos";
import axios from "axios";
import "aos/dist/aos.css";
import Loading from "./Loading";

const ClassesSection = () => {
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get("https://b10a12-server-side-mahdi-hassan-go.vercel.app/classes");
        const sortedClasses = response.data.sort((a, b) => b.enrollmentCount - a.enrollmentCount);
        setClasses(sortedClasses);
      } catch (error) {
      
      } finally {
        setIsLoading(false);
      }
    };

    fetchClasses();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="hero px-4 md:px-8 min-h-screen flex flex-col mb-10 overflow-hidden">
      <div className="divider"></div>
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold text-black dark:text-white mt-10" data-aos="fade-up">
            Top Enrolled Classes
          </h1>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row flex-wrap justify-center gap-10 mt-10 pb-10">
        {classes.slice(0, 6).map((cls, index) => ( 
          <div
            key={cls._id}
            className="card card-compact bg-white w-full sm:w-80 md:w-96 shadow-xl"
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <figure>
              <img
                className="w-full h-48 object-cover"
                src={cls.image || "https://via.placeholder.com/150"}
                alt={cls.title || "Class"}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-center">{cls.title || "Untitled"}</h2>
              <p className="text-gray-700">
                <strong>Instructor:</strong> {cls.name || "Unknown"}
              </p>
              <p className="text-gray-700">
                <strong>Price:</strong> ${cls.price || "0"}
              </p>
              <p className="text-gray-700">
                <strong>Description:</strong> {cls.description || "No description provided."}
              </p>
              <p className="text-gray-700">
                <strong>Enrolled:</strong> {cls.enrollmentCount || "0"}
              </p>
            
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <Link to="/allclassespublic" className="btn bg-orange-400 text-white mb-10">
          See All
        </Link>
      </div>
    </div>
  );
};

export default ClassesSection;