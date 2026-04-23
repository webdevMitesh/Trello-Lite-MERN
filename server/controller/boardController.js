import Board from "../models/Board.js";
import Card from "../models/Card.js";
import List from "../models/List.js";
import Activity from "../models/Activity.js";
import mongoose from "mongoose";

// Creating Board/
export const createBoard = async (req, res) => {
    try {
        const { title } = req.body;

        if (!title?.trim()) {
            return res.status(400).json({ message: "Title is required" });
        }

        const board = await Board.create({
            title: title.trim(),
            createdBy: req.user._id,
            members: [req.user._id],
        });

        try {
            await Activity.create({
                user: req.user._id,
                action: "created board",
                board: board._id,
            });
        } catch (err) {
            console.log("Activity error:", err.message);
        }

        res.status(201).json(board);

    } catch (error) {
        console.error("CREATE BOARD ERROR:", error);
        res.status(500).json({ message: error.message });
    }
};

// Get Boards
export const getBoards = async (req, res) => {
    try {
        const boards = await Board.find({
            createdBy: req.user._id,
        }).sort({ createdAt: -1 });

        res.json(boards);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};