import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";
const AboutUs = () => {
     useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
      
      useEffect(() => {
        Aos.init({ duration: 1000 });
      }, []);
  return (
    <div className="py-16 bg-gray-100 mb-20" >
      <div className="max-w-6xl mx-auto px-4" data-aos="zoom-in">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative">
            <div className="relative z-10 rounded-lg overflow-hidden">
              <img
                src="./assets/AboutUs.jpg"
                alt="Student working"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          
          <div className="p-8">
            <h2 className="text-3xl font-bold mb-4">
              Take Your Skill To Next{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-300">
                Level
              </span>
            </h2>
            <p className="text-gray-600 mb-6">
              Take your skills to the next level with our programs designed for
              your success. Join us and achieve your goals with expert guidance
              and tailored courses.
            </p>

           
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="text-orange-500">
                  <i className="fas fa-lightbulb text-2xl"></i>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">
                    Your Success Mission is our Success Mission
                  </h3>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-orange-500">
                  <i className="fas fa-file-alt text-2xl"></i>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">
                    Dedicated Support for All Learners
                  </h3>
                </div>
              </div>
            </div>

            <Link
              to="allclassespublic"
              className="mt-6 inline-block bg-gradient-to-r from-orange-500 to-orange-300 hover:from-orange-600 hover:to-orange-400 text-white px-6 py-3 rounded-lg shadow-lg transition"
            >
              Discover More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
