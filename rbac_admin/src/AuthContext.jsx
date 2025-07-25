import axios from "axios";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [isAdmin, setIsAdmin] = useState(localStorage.getItem('isAdmin') === 'true');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUsername = localStorage.getItem('username');
        const storedIsAdmin = localStorage.getItem('isAdmin') === 'true';

        if (storedToken) {
            setToken(storedToken);
            setUser({ username: storedUsername || 'unknown' });
            setIsAdmin(storedIsAdmin);
        }
        setLoading(false);
    }, []);

    const login = async (username, password) => {
        try {
            const response = await axios.post('http://localhost:3000/auth/login', { username, password }, {
                headers: { 'Content-Type': 'application/json' }
            });
            setToken(response.data.token);
            setUser({ username });
            const adminStatus = username === 'admin';
            setIsAdmin(adminStatus);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('username', username);
            localStorage.setItem('isAdmin', adminStatus); 
            return true;
        } catch (error) {
            console.error('Login failed:', {
                status: error.response?.status,
                data: error.response?.data,
                message: error.message
            });
            return false;
        }
    };

    const register = async (username, password) => {
        try {
            console.log('Sending register request:', { username, password });
            const response = await axios.post('http://localhost:3000/auth/register', { username, password }, {
                headers: { 'Content-Type': 'application/json' }
            });
            console.log('Register response:', response.data);
            return true;
        } catch (error) {
            console.error('Registration failed:', {
                status: error.response?.status,
                data: error.response?.data,
                message: error.message
            });
            return false;
        }
    };

    const logout = () => {
        setUser(null);
        setToken('');
        setIsAdmin(false);
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('isAdmin');
        console.log('User logged out');
    };

    return (
        <AuthContext.Provider value={{ user, token, isAdmin, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider }