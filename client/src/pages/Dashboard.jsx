import { useEffect, useState, useCallback } from "react";
import {
    DragDropContext,
    Droppable,
    Draggable
} from "@hello-pangea/dnd";

import "../assets/css/Dashboard.css";
import API from "../services/api";

import TaskColumn from "../components/task/TaskColumn";
import AddList from "../components/task/AddList";
import CreateBoardModal from "../components/board/CreateBoardModal";
import BoardSelector from "../components/board/BoardSelector";

const Dashboard = () => {
    const [boards, setBoards] = useState([]);
    const [currentBoard, setCurrentBoard] = useState(null);
    const [lists, setLists] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBoards = async () => {
            try {
                const { data } = await API.get("/boards");
                setBoards(data);

                if (data.length > 0) {
                    setCurrentBoard(data[0]);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchBoards();
    }, []);

    const fetchBoardData = useCallback(async () => {
        if (!currentBoard) return;

        try {
            const { data: listsData } = await API.get(
                `/lists/${currentBoard._id}`
            );

            const cardsPromises = listsData.map((list) =>
                API.get(`/cards/list/${list._id}`)
            );

            const cardsResponses = await Promise.all(cardsPromises);

            const mappedLists = listsData.map((list, i) => ({
                ...list,
                cards: cardsResponses[i]?.data || [],
            }));

            setLists(mappedLists);
        } catch (err) {
            console.error(err);
        }
    }, [currentBoard]);

    useEffect(() => {
        fetchBoardData();
    }, [fetchBoardData]);

    const handleListCreated = (newList) => {
        setLists((prev) => [
            ...prev,
            {
                ...newList,
                cards: [],
            },
        ]);
    };

    const handleTaskCreated = (listId, newCard) => {
        setLists((prev) =>
            prev.map((list) =>
                list._id === listId
                    ? { ...list, cards: [...list.cards, newCard] }
                    : list
            )
        );
    };

    const onDragEnd = async (result) => {
        const { source, destination, type } = result;
        if (!destination) return;
        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        ) return;

        if (type === "COLUMN") {
            const newLists = [...lists];
            const [moved] = newLists.splice(source.index, 1);
            newLists.splice(destination.index, 0, moved);
            setLists(newLists);
            return;
        }

        const sourceList = lists.find(
            (l) => l._id === source.droppableId
        );
        const destList = lists.find(
            (l) => l._id === destination.droppableId
        );

        const sourceCards = [...sourceList.cards];
        const destCards = [...destList.cards];

        const [movedCard] = sourceCards.splice(source.index, 1);

        if (sourceList._id === destList._id) {
            sourceCards.splice(destination.index, 0, movedCard);
        } else {
            destCards.splice(destination.index, 0, movedCard);
        }

        const updatedLists = lists.map((list) => {
            if (list._id === sourceList._id) {
                return { ...list, cards: sourceCards };
            }
            if (list._id === destList._id) {
                return { ...list, cards: destCards };
            }
            return list;
        });

        setLists(updatedLists);

        try {
            await API.put("/cards/move", {
                cardId: movedCard._id,
                toListId: destination.droppableId,
                position: destination.index,
            });
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) {
        return <div className="content">Loading...</div>;
    }

    return (
        <>
            {!currentBoard && (
                <div className="content">
                    <h2>No Boards Found</h2>
                    <button
                        className="primary-btn"
                        onClick={() => setShowModal(true)}
                    >
                        + Create Board
                    </button>
                </div>
            )}

            {currentBoard && (
                <div className="content">
                    <h2 className="dashboard-title">
                        Dashboard - {currentBoard?.title}
                    </h2>
                    <div className="board-controls">
                        <BoardSelector
                            boards={boards}
                            currentBoard={currentBoard}
                            setCurrentBoard={setCurrentBoard}
                        />

                        <button
                            className="primary-btn"
                            onClick={() => setShowModal(true)}
                        >
                            + New Board
                        </button>
                    </div>

                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable
                            droppableId="board"
                            direction="horizontal"
                            type="COLUMN"
                        >
                            {(provided) => (
                                <div
                                    className="board"
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    {lists.map((list, index) => (
                                        <Draggable
                                            key={list._id}
                                            draggableId={String(list._id)}
                                            index={index}
                                        >
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    style={provided.draggableProps.style}
                                                >
                                                    <div {...provided.dragHandleProps}>
                                                        <TaskColumn
                                                            list={list}
                                                            onTaskCreated={handleTaskCreated}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}

                                    {provided.placeholder}

                                    <AddList
                                        boardId={currentBoard._id}
                                        onListCreated={handleListCreated}
                                    />
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>
            )}

            <CreateBoardModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onCreated={(newBoard) => {
                    setBoards((prev) => [...prev, newBoard]);
                    setCurrentBoard(newBoard);
                }}
            />
        </>
    );
};

export default Dashboard;