// import axios from "axios";

// const API = axios.create({
//     baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
//     withCredentials: true,
// });

// //  REQUEST 
// API.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem("token");

//         if (token) {
//             config.headers = config.headers || {};
//             config.headers.Authorization = `Bearer ${token}`;
//         }

//         return config;
//     },
//     (error) => Promise.reject(error)
// );

// //  RESPONSE
// API.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         const status = error.response?.status;

//         // HANDLE UNAUTHORIZED
//         if (status === 401) {
//             console.warn("Unauthorized - logging out");

//             localStorage.removeItem("token");

//             // SAFE REDIRECT
//             if (!window.location.pathname.includes("login")) {
//                 window.location.href = "/login";
//             }
//         }

//         return Promise.reject(error);
//     }
// );

// export default API;




import axios from "axios";

//Strict base URL (no localhost fallback)
// const BASE_URL = process.env.REACT_APP_API_URL;
const BASE_URL = "https://trello-lite-mern.onrender.com/api";

if (!BASE_URL) {
  console.error("REACT_APP_API_URL is not defined");
}

// Create axios instance
const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// REQUEST INTERCEPTOR
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// RESPONSE INTERCEPTOR
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      console.warn("Unauthorized - logging out");

      localStorage.removeItem("token");

      // Avoid redirect loop
      if (!window.location.pathname.includes("login")) {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default API;