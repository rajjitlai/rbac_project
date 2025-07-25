import { useContext } from 'react'
import { AuthContext } from '../AuthContext'
import { Navigate } from 'react-router-dom'

const PublicRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext)

    if (loading) return <div>Loading...</div>
    return user ? <Navigate to="/dashboard" /> : children;
}

export default PublicRoute