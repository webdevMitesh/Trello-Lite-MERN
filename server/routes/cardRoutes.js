import express from "express";
import { protect } from "../middleware/authMiddleware.js";

import {
    createCard,
    getCards,
    moveCard,
    updateCard,
    toggleCardStatus
} from "../controller/cardController.js";

const router = express.Router();

// Create card
router.post("/", protect, createCard);

// Get cards by list
router.get("/list/:listId", protect, getCards);

// Move card (drag-drop)
router.put("/move", protect, moveCard);

// Update card
router.put("/:cardId", protect, updateCard);

// Toggle status
router.put("/:cardId/toggle", protect, toggleCardStatus);

export default router;