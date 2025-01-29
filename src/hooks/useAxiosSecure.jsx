import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";

const axiosSecure = axios.create({
  baseURL: "https://server-ecru-nu-72.vercel.app",
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useAuth();

  axiosSecure.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("access-token");
      if (token) {
       
        config.headers.authorization = `Bearer ${token}`;
      } else {
      
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosSecure.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401 || error.response?.status === 403) {
       
        await logOut();
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;