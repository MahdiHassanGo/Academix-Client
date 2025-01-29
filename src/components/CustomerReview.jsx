import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import Aos from "aos";
import "aos/dist/aos.css";

const CustomerReview = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await fetch("https://server-ecru-nu-72.vercel.app/feedback"); 
        const data = await response.json();
        setReviews(data);
      } catch (error) {
     
      }
    };

    fetchFeedback();
  }, []);

  return (
    <div className="reviews-container relative p-8  py-20 mt-10 " >
      <h2 className="text-center text-5xl font-bold mb-8">Reviews</h2>
      <div data-aos="zoom-out-up" >  <Carousel 
        showArrows={true}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        autoPlay={true}
        interval={5000}
      >
        {reviews.map((review, index) => (
          <motion.div
            key={index}
            className="review-card bg-white p-6 rounded-lg shadow-lg mx-auto w-full md:w-3/5 lg:w-2/5 text-center "
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className=" items-center  w-[60px]  mx-auto ml-50" >
              <img
                className="w-16 h-16 rounded-full object-cover"
                src={review.userPhoto}
                alt={review.userName}
              />
            </div>
            <h3 className="font-semibold text-lg">{review.userName}</h3>
            <p className="text-sm italic text-gray-600 mb-4">{review.review}</p>
            <div className="rating text-yellow-500 text-lg">
              {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
            </div>
          
          </motion.div>
        ))}
      </Carousel></div>
    
    </div>
  );
};

export default CustomerReview;
