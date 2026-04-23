import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Protected Routes
export const protect = async (req, res, next) => {
    try {
        let token;

        // Extracting token
        if (req.headers.authorization?.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return res.status(401).json({ message: "No token, authorization denied" });
        }

        // Verifying token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //Get user
        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        // Attach full user
        req.user = user;

        next();

    } catch (error) {
        console.error("AUTH ERROR:", error.message);

        // Token specific errors
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Invalid token" });
        }

        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expired" });
        }

        res.status(401).json({ message: "Authorization failed" });
    }
};