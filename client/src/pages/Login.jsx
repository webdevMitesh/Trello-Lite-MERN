import { useState, useEffect } from "react";
import "../assets/css/Login.css";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import useAuth from "../hooks/useAuth";

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const navigate = useNavigate();
    const { login } = useAuth();

    // Auto redirect
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) navigate("/dashboard", { replace: true });
    }, [navigate]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!form.email || !form.password) {
            return alert("Please fill all fields");
        }

        try {
            setLoading(true);

            const res = await API.post("/auth/login", {
                email: form.email,
                password: form.password
            });

            login(res.data);

            navigate("/dashboard", { replace: true });

        } catch (error) {
            alert(error.response?.data?.message || "Login Failed");
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!form.name || !form.email || !form.password) {
            return alert("All fields required");
        }

        try {
            setLoading(true);

            const res = await API.post("/auth/register", {
                name: form.name,
                email: form.email,
                password: form.password
            });

            login(res.data);

            navigate("/dashboard");

        } catch (error) {
            alert(error.response?.data?.message || "Register Failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">

                {/* LEFT */}
                <div className="login-form">
                    <form onSubmit={isLogin ? handleLogin : handleRegister}>

                        <h2>{isLogin ? "Login" : "Register"}</h2>

                        {/* NAME */}
                        {!isLogin && (
                            <>
                                <label>Name</label>
                                <input
                                    name="name"
                                    placeholder="Enter name"
                                    value={form.name}
                                    onChange={handleChange}
                                />
                            </>
                        )}

                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            value={form.email}
                            onChange={handleChange}
                        />

                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            value={form.password}
                            onChange={handleChange}
                        />

                        {/* LOGIN OPTIONS */}
                        {isLogin && (
                            <div className="login-options">
                                <label>
                                    <input type="checkbox" /> Remember Me
                                </label>
                                <span>Forgot Password?</span>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="login-btn"
                            disabled={loading}
                        >
                            {loading
                                ? (isLogin ? "Logging in..." : "Creating account...")
                                : (isLogin ? "Login" : "Sign Up")}
                        </button>

                    </form>
                </div>

                {/* RIGHT */}
                <div className="login-info">
                    <h1>
                        {isLogin ? "Welcome Back!" : "Join Taskflow"}
                    </h1>

                    <p>
                        {isLogin
                            ? "Please enter your details"
                            : "Create your account"}
                    </p>

                    <p>
                        {isLogin
                            ? "Don't have an account?"
                            : "Already have an account?"}
                    </p>

                    <button
                        className="signup-btn"
                        onClick={() => setIsLogin(!isLogin)}
                    >
                        {isLogin ? "Sign Up" : "Login"}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Login;