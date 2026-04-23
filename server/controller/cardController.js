import Card from "../models/Card.js";
import List from "../models/List.js";
import Activity from "../models/Activity.js";

// Creating Card
export const createCard = async (req, res) => {
    try {
        const { title, listId } = req.body;

        const list = await List.findById(listId);

        const card = await Card.create({
            title,
            list: listId,
            board: list.board,
        });

        try {
            await Activity.create({
                user: req.user._id,
                action: "created card",
                card: card._id,
                board: list.board,
            });
        } catch (err) {
            console.log("Activity error:", err.message);
        }

        res.status(201).json(card);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Getting Cards
export const getCards = async (req, res) => {
    try {
        const { listId } = req.params;

        const cards = await Card.find({ list: listId });

        res.json(cards);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Moving Cards
export const moveCard = async (req, res) => {
    res.json({ message: "Move card working" });
};

// Updating Cards
export const updateCard = async (req, res) => {
    res.json({ message: "Update card working" });
};

// Deleting Card
export const deleteCard = async (req, res) => {
    res.json({ message: "Delete card working" });
};

export const toggleCardStatus = async (req, res) => {
    res.json({ message: "Toggle status working" });
};