import { createContext, useState, useEffect } from "react";
import API from "../services/api";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // LOAD USER FROM TOKEN
    useEffect(() => {
        const loadUser = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const { data } = await API.get("/auth/me");

                // ONLY STORE USER
                setUser(data.user || data);

            } catch (error) {
                console.error("Auth error:", error);
                localStorage.removeItem("token");
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        loadUser();
    }, []);

    const login = (data) => {
        // data = { token, user }

        localStorage.setItem("token", data.token);

        setUser(data.user);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);

        window.location.href = "/login";
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                loading,
                isAuthenticated: !!user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;