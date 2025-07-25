import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";

const Dashboard = () => {
    const { user, logout, isAdmin } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAdmin) {
            navigate('/admin-panel');
        }
    }, [isAdmin, navigate]);

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">User Dashboard</h2>
                <button
                    onClick={() => {
                        logout();
                        navigate('/login');
                    }}
                    className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                >
                    Logout
                </button>
            </div>
            <p>Welcome, {user?.username}! This is your dashboard.</p>
            {isAdmin ? (
                <p className="mt-4 text-green-500">You have admin privileges. Redirecting to Admin Panel...</p>
            ) : (
                <p className="mt-4">You do not have admin privileges. Contact the admin to manage roles and permissions.</p>
            )}
        </div>
    );
};

export default Dashboard