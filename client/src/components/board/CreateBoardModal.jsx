import { useState, useEffect, useRef } from "react";
import API from "../../services/api";
import Modal from "../common/Modal";
import "../../assets/css/CreateboardModel.css";

const CreateBoardModal = ({ isOpen, onClose, onCreated }) => {
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(false);
    const inputRef = useRef(null);

    // Auto focus + reset
    useEffect(() => {
        if (isOpen) {
            setTitle("");
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    const handleCreate = async () => {
        if (!title.trim() || loading) return;

        try {
            setLoading(true);

            const res = await API.post("/boards", {
                title: title.trim(),
            });

            onCreated(res.data);
            onClose();
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Failed to create board");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h3>Create New Board</h3>

            <input
                ref={inputRef}
                placeholder="Board Title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") handleCreate();
                    if (e.key === "Escape") onClose();
                }}
            />

            <div className="modal-actions">
                <button onClick={onClose}>
                    Cancel
                </button>

                <button
                    onClick={handleCreate}
                    disabled={!title.trim() || loading}
                >
                    {loading ? "Creating..." : "Create"}
                </button>
            </div>
        </Modal>
    );
};

export default CreateBoardModal;