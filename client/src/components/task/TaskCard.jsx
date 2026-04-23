import "../../assets/css/TaskCard.css";

const TaskCard = ({ card, onClick }) => {
    const handleClick = (e) => {
        if (e.defaultPrevented) return;
        onClick?.();
    };

    // 🔥 Dynamic values
    const tag = card.tag || "General";
    const progress = card.progress || 0;
    const time = card.dueDate
        ? getDaysLeft(card.dueDate)
        : null;

    return (
        <div className="task-card" onClick={handleClick}>

            {/* TAG */}
            <div className="task-top">
                <span className="tag">{tag}</span>
            </div>

            {/* TITLE */}
            <h4 className="task-title">{card.title}</h4>

            {/* DESCRIPTION */}
            <p className="task-desc">
                {card.description || "No description"}
            </p>

            {/* PROGRESS */}
            <div className="progress">
                <div
                    className="progress-bar"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>

            {/* FOOTER */}
            <div className="task-footer">

                <div className="avatars">
                    <span>👤</span>
                </div>

                {time && (
                    <span className="task-time">{time}</span>
                )}

            </div>
        </div>
    );
};

/* 🔥 HELPER */
const getDaysLeft = (date) => {
    const diff = new Date(date) - new Date();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? `${days}d` : "Due";
};

export default TaskCard;