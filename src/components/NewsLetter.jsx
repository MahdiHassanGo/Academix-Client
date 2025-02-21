import React, { useEffect } from "react";
import AOS from 'aos';
  import 'aos/dist/aos.css'
const NewsLetter = () => {

    useEffect(() => {
        const timer = setTimeout(() => {
           AOS.init();
         }, 1500); 
          return () => clearTimeout(timer);
       }, []);

  const handleSendEmail = (event) => {
    event.preventDefault();
    const subject = "Contacting via Website";
    const body = "Hello, I'd like to get in touch.";
    const toEmail = "Academix@gmail.edu"; 

   
    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${toEmail}&su=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

   
    window.open(gmailLink, "_blank");
  };

  return (
    <div
      id="contact-me"
      className="flex flex-col md:flex-row items-center justify-center bg-gray-200 min-h-screen p-8 w-11/12 mx-auto rounded-full mb-10 " data-aos="fade-down"
    >
     
      <div className="w-full md:w-1/2 md:ml-40">
        <h6 className="text-2xl font-bold mb-6 dark:text-black">Contact Us</h6>
        <form onSubmit={handleSendEmail}>
          <div className="form-control w-full max-w-sm">
            <label className="label">
              <span className="label-text dark:text-black">Enter your email address</span>
            </label>
            <div className="flex gap-2">
              <input
                type="email"
                name="email"
                placeholder="username@site.com"
                className="input input-bordered w-full"
                required
              />
              <button type="submit" className="btn btn-primary">
                Send
              </button>
            </div>
          </div>
        </form>
      </div>

    
      <div className="w-full md:w-1/2 mt-8 md:mt-0 flex justify-center" data-aos="fade-left">
        <img
          src="./assets/ContactMe.jpg"
          alt="Contact Illustration"
          className="md:max-w-sm h-auto rounded-full"
        />
      </div>
    </div>
  );
};

export default NewsLetter;