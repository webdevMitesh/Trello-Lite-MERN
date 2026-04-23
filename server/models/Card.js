import mongoose from "mongoose";

const cardSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },

        list: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "List",
            required: true,
        },

        board: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Board",
            required: true,
        },

        position: {
            type: Number,
            default: 0,
        },

        status: {
            type: String,
            default: "todo",
        },
    },
    { timestamps: true }
);

export default mongoose.model("Card", cardSchema);