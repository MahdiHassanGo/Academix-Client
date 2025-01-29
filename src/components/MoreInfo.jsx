import React, { useEffect } from "react";
import { FaLightbulb, FaShoppingCart } from "react-icons/fa";
import { FaGraduationCap } from "react-icons/fa6";
import Aos from "aos";
import "aos/dist/aos.css";
const MoreInfo = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-16 mb-20">
      <div className="text-center mb-12">
        <p className="text-white text-lg font-semibold">Working Process</p>
        <h2 className="text-3xl font-bold">How Does It Work</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto" data-aos="zoom-out">
       
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center" >
              <FaGraduationCap className="fas fa-graduation-cap text-2xl" />
            </div>
          </div>
          <h3 className="text-xl font-semibold">Choose A Course</h3>
         
        </div>

        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center">
              <FaShoppingCart className="fas fa-shopping-cart text-2xl"/>
            </div>
          </div>
          <h3 className="text-xl font-semibold">Purchase A Course</h3>
       
        </div>

      
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center">
              <FaLightbulb className="fas fa-lightbulb text-2xl"/>
            </div>
          </div>
          <h3 className="text-xl font-semibold">Start Now</h3>
        
        </div>
      </div>
    </div>
  );
};

export default MoreInfo;