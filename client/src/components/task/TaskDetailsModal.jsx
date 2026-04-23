import Modal from "../common/Modal";
import "../../assets/css/TaskDetailsModal.css";

const TaskDetailsModal = ({ isOpen, onClose, card }) => {
    if (!card) return null;

    const formattedDate = card.createdAt
        ? new Date(card.createdAt).toLocaleString()
        : "N/A";

    return (
        <Modal isOpen={isOpen} onClose={onClose}>

            {/* TITLE */}
            <h3>{card.title}</h3>

            {/* DESCRIPTION */}
            <p className="task-detail-desc">
                {card.description || "No description available"}
            </p>

            {/* STATUS */}
            <div className="task-detail-row">
                <strong>Status:</strong>
                <span className={`status-badge ${card.status || "todo"}`}>
                    {card.status || "todo"}
                </span>
            </div>

            {/* CREATED */}
            <div className="task-detail-row">
                <strong>Created:</strong>
                <span>{formattedDate}</span>
            </div>

        </Modal>
    );
};

export default TaskDetailsModal;