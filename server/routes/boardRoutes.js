import express from "express";
import { protect } from "../middleware/authMiddleware.js";

import {
    createBoard,
    getBoards
} from "../controller/boardController.js";

const router = express.Router();

router.post("/", protect, createBoard);
router.get("/", protect, getBoards);

export default router;