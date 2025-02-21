import axios from 'axios';
import React from 'react';
const axiosInstance =axios.create({
    baseURL:'https://b10a12-server-side-mahdi-hassan-go.vercel.app/',
    withCredentials:true,

})
const useAxiosSecure = () => {
    return axiosInstance;
     
   
};

export default useAxiosSecure;