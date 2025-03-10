import { useState } from "react";

export default function TodoList() {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState("");
    const [editingIndex, setEditingIndex] = useState(null);
    const [editText, setEditText] = useState("");
    const [filter, setFilter] = useState("all");

    const addTask = () => {
        if (task.trim() === "") return;
        setTasks([...tasks, { text: task, completed: false }]);
        setTask("");
    };

    const removeTask = (index) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };

    const toggleComplete = (index) => {
        const updatedTasks = tasks.map((t, i) =>
            i === index ? { ...t, completed: !t.completed } : t
        );
        setTasks(updatedTasks);
    };

    const startEditing = (index, text) => {
        setEditingIndex(index);
        setEditText(text);
    };

    const saveEdit = (index) => {
        const updatedTasks = tasks.map((t, i) =>
            i === index ? { ...t, text: editText } : t
        );
        setTasks(updatedTasks);
        setEditingIndex(null);
    };

    const filteredTasks = tasks.filter((t) => {
        if (filter === "completed") return t.completed;
        if (filter === "pending") return !t.completed;
        return true;
    });

    return (
        <div className="todo-container">
            <h2>To-Do List</h2>
            <input
                type="text"
                placeholder="Add a new task..."
                value={task}
                onChange={(e) => setTask(e.target.value)}
            />
            <button className="add-btn" onClick={addTask}>
                Add Task
            </button>

            <div className="filter-container">
                <button className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>
                    All
                </button>
                <button className={filter === "completed" ? "active" : ""} onClick={() => setFilter("completed")}>
                    Completed
                </button>
                <button className={filter === "pending" ? "active" : ""} onClick={() => setFilter("pending")}>
                    Pending
                </button>
            </div>

            <ul>
                {filteredTasks.map((t, index) => (
                    <li key={index}>
                        <input type="checkbox" checked={t.completed} onChange={() => toggleComplete(index)} />

                        {editingIndex === index ? (
                            <>
                                <input
                                    type="text"
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                />
                                <button className="save-btn" onClick={() => saveEdit(index)}>Save</button>
                            </>
                        ) : (
                            <>
                                <span className={t.completed ? "completed" : ""}>{t.text}</span>
                                <button className="edit-btn" onClick={() => startEditing(index, t.text)}>✏️</button>
                                <button className="delete-btn" onClick={() => removeTask(index)}>❌</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>

        </div>
    );
}