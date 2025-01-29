import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const MainPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <div 
      className="relative min-h-screen bg-cover bg-center fixed-bg overflow-hidden" 
      style={{ backgroundImage: `url('./assets/background.jpg')` }}
    >
      <div className="absolute inset-0 bg-black opacity-30"></div>

      <div className="relative flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-8 px-6 lg:px-24 text-center lg:text-left min-h-screen mt-20">
      
        <div className="z-10">
          <h1 className="text-4xl lg:text-5xl font-bold text-white md:mt-30" data-aos="fade-left">
           Academix
          </h1>
          <p className="py-6  text-white text-sm lg:text-base" data-aos="fade-right">
          Welcome to the online classroom! Were excited to have you here. <br /> Lets embark on this learning journey together.
          </p>
          <Link 
            to='/allclassespublic' 
            className="btn bg-gradient-to-r from-bgButton1 to-bgButton2 text-black border-black mb-10"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
