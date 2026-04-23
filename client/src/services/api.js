import axios from "axios";

const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
    withCredentials: true,
});

//  REQUEST 
API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

//  RESPONSE
API.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status;

        // HANDLE UNAUTHORIZED
        if (status === 401) {
            console.warn("Unauthorized - logging out");

            localStorage.removeItem("token");

            // SAFE REDIRECT
            if (!window.location.pathname.includes("login")) {
                window.location.href = "/login";
            }
        }

        return Promise.reject(error);
    }
);

export default API;