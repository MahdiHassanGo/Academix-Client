import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../provider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

const useTeacher = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: isTeacher, isPending: isTeacherLoading } = useQuery({
    queryKey: [user?.email, "isTeacher"], 
    enabled: !loading && !!user?.email, 
    queryFn: async () => {
   
      const res = await axiosSecure.get(`/teacher/status/${user.email}`);
     
      return res.data?.isTeacher || false; 
    },
  });

  return [isTeacher, isTeacherLoading];
};

export default useTeacher;