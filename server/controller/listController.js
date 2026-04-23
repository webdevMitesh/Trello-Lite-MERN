import List from "../models/List.js";
import Card from "../models/Card.js";
import Activity from "../models/Activity.js";

// Creating list
export const createList = async (req, res) => {
    try {
        const { title, boardId } = req.body;

        const list = await List.create({
            title,
            board: boardId,
        });

        try {
            await Activity.create({
                user: req.user._id,
                action: "created list",
                board: boardId,
            });
        } catch (err) {
            console.log("Activity error:", err.message);
        }

        res.status(201).json(list);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getLists = async (req, res) => {
    try {
        const { boardId } = req.params;

        const lists = await List.find({ board: boardId });

        res.json(lists);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};