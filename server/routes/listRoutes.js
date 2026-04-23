import express from "express";
import { protect } from "../middleware/authMiddleware.js";

import {
    createList,
    getLists
} from "../controller/listController.js";

const router = express.Router();

// Create list
router.post("/", protect, createList);

// Get lists
router.get("/:boardId", protect, getLists);

export default router;