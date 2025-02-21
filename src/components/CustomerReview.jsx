import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Aos from "aos";
import "aos/dist/aos.css";
import { AnimatedTestimonials } from "../components/ui/animated-testimonials"; // Import the AnimatedTestimonials component

const CustomerReview = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    Aos.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await fetch("https://b10a12-server-side-mahdi-hassan-go.vercel.app/feedback");
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error("Failed to fetch reviews", error);
      }
    };

    fetchFeedback();
  }, []);

  // Combine fetched reviews with testimonials for AnimatedTestimonials component
  const testimonials = reviews.map((review) => ({
    userId: review.userId, // Add userId to the testimonial object
    userName: review.userName || "Anonymous", // Use userName directly
    userPhoto: review.userPhoto || "default-image-url.jpg", // Use userPhoto directly
    rating: review.rating || 0,
    review: review.review || "No feedback provided.", // Use review directly
  })).filter(testimonial => testimonial.userName); // Filter out testimonials without a name

  return (
    <div className="reviews-container relative p-8 py-20 mt-10">
      <h2 className="text-center text-5xl font-bold mb-8">Reviews</h2>
      <div data-aos="zoom-out-up">
        <div className="flex flex-col items-center"></div>
      </div>

      {/* Render the AnimatedTestimonials component with the testimonials array */}
      <AnimatedTestimonials testimonials={testimonials} />
    </div>
  );
};

export default CustomerReview;