import { useState, useEffect, useRef } from "react";
import Modal from "../common/Modal";
import "../../assets/css/TaskModal.css";

const TaskModal = ({ isOpen, onClose, onAdd }) => {
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(false);
    const inputRef = useRef(null);

    // 🔥 Reset + focus
    useEffect(() => {
        if (isOpen) {
            setTitle("");
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    const handleSubmit = async () => {
        if (!title.trim() || loading) return;

        try {
            setLoading(true);

            await onAdd(title.trim());

            onClose();
        } catch (err) {
            console.error(err);
            alert("Failed to add task");
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") handleSubmit();
        if (e.key === "Escape") onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h3>Add New Task</h3>

            <input
                ref={inputRef}
                type="text"
                placeholder="e.g. Design landing page"
                value={title}
                disabled={loading}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={handleKeyDown}
            />

            <div className="modal-actions">

                <button onClick={onClose}>
                    Cancel
                </button>

                <button
                    onClick={handleSubmit}
                    disabled={!title.trim() || loading}
                >
                    {loading ? "Adding..." : "Add Task"}
                </button>

            </div>
        </Modal>
    );
};

export default TaskModal;