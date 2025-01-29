import "aos/dist/aos.css";
import Aos from "aos";
import { useEffect, useContext, useState } from "react";
import { AuthContext } from "./../provider/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { FaGoogle } from "react-icons/fa";
import LoginLottie from "../../Login.json";
import Lottie from "lottie-react";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Login = () => {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  useEffect(() => {
    document.title = "Login | Academix";
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { userLogin, setUser, googleSignIn } = useContext(AuthContext);
  const [error, setError] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();


 const handleSubmit = (e) => {
  e.preventDefault();
  const form = e.target;
  const email = form.email.value;
  const password = form.password.value;

  userLogin(email, password)
    .then((result) => {
      const user = result.user;
      setUser(user);

      
      const userInfo = { email: user.email };
      axiosPublic.post("/jwt", userInfo)
        .then((tokenRes) => {
          if (tokenRes.data.token) {
            localStorage.setItem("token", tokenRes.data.token); 
         
          }
        });

      toast.success("Login successful!");
      setTimeout(() => {
        navigate(location?.state ? location.state : "/");
      }, 2000);
    })
    .catch((err) => {
      setError({ ...error, login: err.code });
      toast.error("Login failed: " + err.message);
    });
};

const handleGoogleSignIn = async () => {
  try {
    const result = await googleSignIn();
    const user = result.user;

    
    const userInfo = { email: user.email };
    const tokenRes = await axiosPublic.post("/jwt", userInfo);

    if (tokenRes.data.token) {
      localStorage.setItem("token", tokenRes.data.token); 
     
    }

    toast.success("Google Sign-In successful!");
    setTimeout(() => {
      navigate(location?.state || "/");
    }, 2000);
  } catch (err) {
    console.error("Google Sign-In failed:", err.message);
    toast.error("Google Sign-In failed: " + err.message);
  }
};

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen gap-6 mt-0">
      <div className="w-full md:w-1/2 flex justify-center mt-20">
        <Lottie animationData={LoginLottie} className="w-3/4 md:w-full mt-20" />
      </div>

      <ToastContainer position="top-center" />

      <div
        className="hero flex items-center justify-center w-full md:w-1/2"
        data-aos="fade-up"
      >
        <div className="hero-content flex-col gap-6 w-full px-4 sm:px-8 md:px-16 lg:px-0">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
          </div>
          <div className="card bg-base-100 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg shadow-2xl p-4 md:p-6">
            <form onSubmit={handleSubmit} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                <div className="flex gap-10 mt-2">
                  <label className="label">
                    <Link
                      to="/auth/register"
                      className="label-text-alt link link-hover"
                    >
                      Register Here
                    </Link>
                  </label>
                </div>
              </div>
              <div className="form-control mt-6">
                <button className="btn bg-Profile text-white">Login</button>
                <button onClick={handleGoogleSignIn} className="btn mt-5">
                  <FaGoogle /> Login with Google
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
