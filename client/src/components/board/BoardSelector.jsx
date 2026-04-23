import "../../assets/css/BoardSelector.css";

const BoardSelector = ({ boards = [], currentBoard, setCurrentBoard }) => {
    const handleChange = (e) => {
        const selected = boards.find(
            (b) => b._id === e.target.value
        );

        if (selected) {
            setCurrentBoard(selected);
        }
    };

    return (
        <div className="board-selector">
            <select
                value={currentBoard?._id || ""}
                onChange={handleChange}
                disabled={boards.length === 0}
            >
                {/* Placeholder */}
                <option value="" disabled>
                    {boards.length === 0 ? "No Boards" : "Select Board"}
                </option>

                {boards.map((board) => (
                    <option key={board._id} value={board._id}>
                        {board.title}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default BoardSelector;