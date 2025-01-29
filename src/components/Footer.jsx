import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from 'react';

const Footer = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        Aos.init({ duration: 1000 });
    }, []);

    return (
        <div id="footer" className="text-white pt-10 pb-40 border-t border-gray-300 bg-Footer" >
            <div className="max-w-screen-xl mx-auto px-4">
               
                <div className="flex justify-between items-center mb-8" >
                    <Link to="/" className="flex items-center gap-2" >
                        <img
                            className="w-20"
                            src="./assets/LOGO2.png"
                            alt="WhereIsIt"
                            data-aos="fade-up" data-aos-delay="500"
                        />
                    </Link>

                    <div className="flex space-x-4" data-aos="fade-up" data-aos-delay="600">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-orange-400 transition-all">
                            <FaFacebook className="text-white hover:text-orange-400 text-3xl" />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-orange-400 transition-all">
                            <FaTwitter className="text-white hover:text-orange-400 text-3xl" />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-orange-400 transition-all">
                            <FaInstagram className="text-white hover:text-orange-400 text-3xl" />
                        </a>
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-orange-400 transition-all">
                            <FaYoutube className="text-white hover:text-orange-400 text-3xl" />
                        </a>
                    </div>
                </div>

              
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                   
                    <div data-aos="fade-up" data-aos-delay="700">
                        <h4 className="text-2xl font-semibold text-white mb-4">About Us</h4>
                        <p className="text-sm text-white">
                            Academix! Welcome to the online classroom! We're excited to have you here.
                            Let's embark on this learning journey together.
                        </p>
                    </div>

                   
                    <div data-aos="fade-up" data-aos-delay="800">
                        <h4 className="text-2xl font-semibold text-white mb-4">Contact Us</h4>
                        <p className="text-sm text-white">Email: Academix@gmail.com</p>
                        <p className="text-sm text-white">Phone: +88012345678</p>
                        <p className="text-sm text-white">Address: Dhaka, Bangladesh</p>
                    </div>
                </div>

               
                <div className="text-center text-sm text-gray-400" data-aos="fade-up" data-aos-delay="900">
                    © {new Date().getFullYear()} Academix. All rights reserved.
                </div>
            </div>
        </div>
    );
};

export default Footer;