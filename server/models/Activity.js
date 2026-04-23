import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },

        action: {
            type: String,
            required: true,
        },

        card: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Card",
        },

        board: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Board",
        },

    },
    { timestamps: true }
);

export default mongoose.model("Activity", activitySchema);