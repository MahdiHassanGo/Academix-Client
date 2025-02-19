import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useNavigate, useLocation } from "react-router-dom";
import { useContext, useEffect } from "react"; 
import Swal from "sweetalert2";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Aos from "aos";
import "aos/dist/aos.css";
import { AuthContext } from "../provider/AuthProvider";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const location = useLocation();
  const { classData } = location.state;
  const { user } = useContext(AuthContext); 

  useEffect(() => {
    document.title = "Payment | Academix";
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
  
      Swal.fire("Error", "Payment failed. Please try again.", "error");
    } else {
 
      await handleEnrollment();
    }
  };

  const handleEnrollment = async () => {
    try {
      if (!user) {
        throw new Error("User not authenticated");
      }

      const enrollmentData = {
        userId: user.uid,
        userName: user.displayName,
        userEmail: user.email,
        classId: classData._id,
        className: classData.title,
        classPrice: classData.price,
      };

      const token = localStorage.getItem("access-token");
      const response = await fetch(`http://localhost:5000/enroll/${classData._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(enrollmentData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to enroll in the class.");
      }

      const result = await response.json();

      Swal.fire({
        icon: "success",
        title: "Enrollment Successful!",
        text: "You have been enrolled in the class.",
      }).then(() => {
        navigate("/dashboard/myenrolledclass");
      });
    } catch (error) {
      console.error("Error enrolling in class:", error);
      Swal.fire({
        icon: "error",
        title: "Enrollment Failed",
        text: error.message || "Failed to enroll in the class. Please try again.",
      });
    }
  };

  return (
    <div>
      <Navbar />
      <div className="relative w-full max-w-4xl mx-auto mt-40">
        <div className="w-full">
          <img
            src="./assets/Card.png"
            alt="Card Background"
            className="w-full h-auto rounded-lg shadow-lg"
            data-aos="fade-up"
          />
        </div>

        <form
          onSubmit={handleSubmit}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 ml-10 md:ml-20 text-center"
        >
          <div className="mb-6" data-aos="fade-up">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#F8FAFC",
                    "::placeholder": {
                      color: "#F8FAFC",
                    },
                  },
                  invalid: {
                    color: "#F8FAFC",
                  },
                },
              }}
              className="p-3 bg-blue-400 rounded-lg shadow-sm"
            />
          </div>

          <button
            type="submit"
            disabled={!stripe}
            className="w-1/2 bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Pay
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutForm;