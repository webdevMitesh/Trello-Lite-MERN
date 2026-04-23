import { useState, useRef, useEffect } from "react";
import API from "../../services/api";
import "../../assets/css/AddList.css";

const AddList = ({ boardId, onListCreated }) => {
    const [showInput, setShowInput] = useState(false);
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(false);
    const inputRef = useRef(null);

    // 🔥 Auto focus
    useEffect(() => {
        if (showInput) inputRef.current?.focus();
    }, [showInput]);

    // 🔥 Reset when board changes
    useEffect(() => {
        setShowInput(false);
        setTitle("");
    }, [boardId]);

    const handleAdd = async () => {
        if (!title.trim() || loading) return;

        try {
            setLoading(true);

            const { data } = await API.post("/lists", {
                title: title.trim(),
                boardId,
            });

            onListCreated({
                ...data,
                cards: [],
                isNew: true,
            });

            setTitle("");
            setShowInput(false);

        } catch (error) {
            console.error("Add list error:", error);
            alert(error.response?.data?.message || "Failed to create list");
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setShowInput(false);
        setTitle("");
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") handleAdd();
        if (e.key === "Escape") handleCancel();
    };

    return (
        <div className="add-list-container">

            {!showInput ? (
                <div
                    className="add-list-btn"
                    onClick={() => setShowInput(true)}
                >
                    + Add another list
                </div>
            ) : (
                <div className="add-list-box">

                    <input
                        ref={inputRef}
                        className="list-input"
                        placeholder="Enter list title..."
                        value={title}
                        disabled={loading}
                        onChange={(e) => setTitle(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />

                    <div className="list-actions">

                        <button
                            className="add-btn"
                            onClick={handleAdd}
                            disabled={!title.trim() || loading}
                        >
                            {loading ? "Adding..." : "Add List"}
                        </button>

                        <button
                            className="cancel-btn"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>

                    </div>
                </div>
            )}

        </div>
    );
};

export default AddList;