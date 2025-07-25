import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

const RoleRedirect = () => {
    const { isAdmin } = useContext(AuthContext);
    return <Navigate to={isAdmin ? "/admin-panel" : "/dashboard"} />;
};

export default RoleRedirect;
