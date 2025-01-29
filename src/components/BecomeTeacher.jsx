import { Link } from "react-router-dom";

import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
const BecomeTeacher = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
      
      useEffect(() => {
        Aos.init({ duration: 1000 });
      }, []);
    return (
        <div className="flex flex-col items-center p-4 ">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8 mt-20 ">
                <img 
                    className="w-[300px] md:w-[400px] rounded-full"  data-aos="fade-down-right"
                    src="./assets/Teacher.jpg" 
                    alt="Teacher" 
                />
                <div className="text-center md:text-left max-w-[600px]" data-aos="fade-down-left">
                    <h1 className="text-2xl md:text-3xl font-bold mb-4">Become a 
                        <span className=" ml-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-orange-500">
                    Teacher </span> </h1>
                    <p className="text-base md:text-lg leading-relaxed mb-4">
                        Becoming a teacher means having the opportunity to inspire and shape the minds of the next generation. You'll have the chance to ignite a passion for learning, encourage critical thinking, and help students discover their potential. It's a profession that allows you to make a lasting impact on your students' lives and future.
                    </p>
                    <Link to='/addteacher'className=" btn text-xl md:text-2xl font-bold">Become a Teacher</Link>
                </div>
            </div>
        </div>
    );
};

export default BecomeTeacher;

