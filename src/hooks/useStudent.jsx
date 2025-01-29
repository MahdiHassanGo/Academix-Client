import { useQuery } from "@tanstack/react-query";

import useAxiosSecure from "./useAxiosSecure";
import { useAuth } from "../provider/AuthProvider";


const useStudent = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: isStudent, isPending: isStudentLoading } = useQuery({
    queryKey: [user?.email, "isStudent"],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
     
      const res = await axiosSecure.get(`/user/student/${user.email}`);
   
      return res.data?.student;
    },
  });

  return [isStudent, isStudentLoading];
};

export default useStudent;