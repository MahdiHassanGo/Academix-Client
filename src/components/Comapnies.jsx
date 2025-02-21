import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
const Companies = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  return (
    <div className="overflow-hidden" style={{ textAlign: "center", padding: "20px" }}>
       <div className="divider"></div>
      <h2 className="text-black dark:text-white">
        Trusted by over <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-orange-500 text-3xl font-bold">10,000</span>  companies and millions of learners around the
        world
      </h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <img className=" h-[50px] md:h-[100px]"
          src="./assets/PH-logo.jpeg"
          alt="PH"
          
        />
      
        <img className=" h-[50px] md:h-[100px]"
          src="./assets/Udemy-Logo.png"
          alt="Udemy"
          
        />
      
        <img className=" h-[50px] md:h-[100px]"
          src="./assets/W3Logo.png"
          alt="W3"
       
        />
      
        <img className=" h-[50px] md:h-[100px]"
          src="./assets/CiscoLogo.png"
          alt="Cisco"
        
        />
      </div>
    </div>
  );
};

export default Companies;
