import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import useAdmin from "../hooks/useAdmin";



const TeacherRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isTeacher, isTeacherLoading] = useAdmin();
    const location = useLocation();

    if (loading || isTeacherLoading) {
        return <progress className="progress w-56"></progress>
    }

    if (user && isTeacher) {
        return children;
    }

    return <Navigate to="/" state={{ from: location }} replace></Navigate>

};

export default TeacherRoute;