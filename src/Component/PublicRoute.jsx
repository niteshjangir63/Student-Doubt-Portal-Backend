import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");


    if (token && role) {
        return <Navigate to={`/${role}`} replace />;
    }


    return children;
};

export default PublicRoute;