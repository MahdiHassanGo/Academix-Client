import axios from "axios";




const axiosPublic = axios.create({
    baseURL:'https://server-ecru-nu-72.vercel.app'
})

const useAxiosPublic = () => {
    
    
    return axiosPublic;
};

export default useAxiosPublic;