import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "../assets/css/ProtectedRoute.css"

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    // LOADING STATE
    if (loading) {
        return (
            <div className="auth-loading">
                <div className="loader"></div>
                <p>Checking authentication...</p>
            </div>
        );
    }

    // NOT AUTHENTICATED
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;