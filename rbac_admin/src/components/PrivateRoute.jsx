import { useContext } from "react"
import { AuthContext } from "../AuthContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, adminOnly = false }) => {
    const { user, isAdmin, loading } = useContext(AuthContext);
    if (loading) return <div className="text-center mt-10">Loading...</div>;
    if (!user) return <Navigate to="/login" />;
    if (adminOnly && !isAdmin) return <Navigate to="/dashboard" />;
    return children;
};

export default PrivateRoute