import User from "../models/User.js";
import Activity from "../models/Activity.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Token
const generateToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            email: user.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "30d" }
    );
};

// Format User
const formatUser = (user) => ({
    _id: user._id,
    name: user.name,
    email: user.email,
});

// Register
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const normalizedEmail = email.toLowerCase().trim();

        const existingUser = await User.findOne({ email: normalizedEmail });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name: name.trim(),
            email: normalizedEmail,
            password: hashedPassword,
        });

        try {
            await Activity.create({
                user: user._id,
                action: "registered",
            });
        } catch (err) {
            console.log("Activity error:", err.message);
        }

        return res.status(201).json({
            success: true,
            message: "Account created successfully",
            user: formatUser(user),
            token: generateToken(user),
        });

    } catch (error) {
        console.error("REGISTER ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

// Login
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

        const normalizedEmail = email.toLowerCase().trim();

        const user = await User.findOne({ email: normalizedEmail });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        return res.json({
            success: true,
            message: "Login successful",
            user: formatUser(user),
            token: generateToken(user),
        });

    } catch (error) {
        console.error("LOGIN ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

// Get Me
export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        return res.json({
            success: true,
            user: formatUser(user),
        });

    } catch (error) {
        console.error("GET ME ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};