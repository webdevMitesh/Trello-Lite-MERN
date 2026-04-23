import { useState } from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";
import TaskModal from "./TaskModal";
import TaskDetailsModal from "./TaskDetailsModal";
import API from "../../services/api";
import "../../assets/css/TaskColumn.css";

const TaskColumn = ({ list, onTaskCreated }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [loading, setLoading] = useState(false);

    const cards = list.cards || [];

    // ================= ADD TASK =================
    const handleAddTask = async (title) => {
        if (!title.trim() || loading) return;

        try {
            setLoading(true);

            // 🔥 API CALL
            const { data } = await API.post("/cards", {
                title: title.trim(),
                listId: list._id,
            });

            // 🔥 INSTANT UI UPDATE
            onTaskCreated(list._id, data);

            setShowModal(false);

        } catch (error) {
            console.error("Add task error:", error);
            alert(error.response?.data?.message || "Failed to add task");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`task-column ${list.isNew ? "column-enter" : ""}`}>

            {/* ===== HEADER ===== */}
            <div className="column-header">
                <h3>{list.title}</h3>
                <span>{cards.length}</span>
            </div>

            {/* ===== DROPPABLE ===== */}
            <Droppable droppableId={list._id}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`card-list ${snapshot.isDraggingOver ? "drag-over" : ""}`}
                    >

                        {/* EMPTY */}
                        {cards.length === 0 && (
                            <div className="empty-text">No tasks</div>
                        )}

                        {/* CARDS */}
                        {cards.map((card, index) => (
                            <Draggable
                                key={card._id}
                                draggableId={card._id.toString()}
                                index={index}
                            >
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        style={provided.draggableProps.style}
                                        className={`task-card-wrapper ${snapshot.isDragging ? "dragging" : ""}`}
                                    >
                                        <div {...provided.dragHandleProps}>
                                            <TaskCard
                                                card={card}
                                                onClick={() => setSelectedCard(card)}
                                            />
                                        </div>
                                    </div>
                                )}
                            </Draggable>
                        ))}

                        {provided.placeholder}
                    </div>
                )}
            </Droppable>

            {/* ===== ADD TASK BUTTON ===== */}
            <button
                className="add-task-btn"
                onClick={() => setShowModal(true)}
                disabled={loading}
            >
                {loading ? "Adding..." : "+ Add Task"}
            </button>

            {/* ===== ADD TASK MODAL ===== */}
            <TaskModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onAdd={handleAddTask}
                loading={loading}
            />

            {/* ===== TASK DETAILS MODAL ===== */}
            <TaskDetailsModal
                isOpen={!!selectedCard}
                onClose={() => setSelectedCard(null)}
                card={selectedCard}
            />
        </div>
    );
};

export default TaskColumn;