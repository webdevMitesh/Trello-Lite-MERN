import express from "express";
import {
    loginUser,
    registerUser,
    getMe
} from "../controller/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// Get current user
router.get("/me", protect, getMe);

export default router;