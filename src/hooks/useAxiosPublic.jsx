import axios from "axios";




const axiosPublic = axios.create({
    baseURL:'https://b10a12-server-side-mahdi-hassan-go.vercel.app'
})

const useAxiosPublic = () => {
    
    
    return axiosPublic;
};

export default useAxiosPublic;