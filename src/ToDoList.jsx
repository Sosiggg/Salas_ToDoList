import { useState } from "react";

export default function TodoList() {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState("");
    const [filter, setFilter] = useState("all");
    const [editingIndex, setEditingIndex] = useState(null);
    const [editedTask, setEditedTask] = useState("");

    const addTask = () => {
        if (task.trim() === "") return alert("Task cannot be empty!");
        setTasks([...tasks, { text: task, completed: false }]);
        setTask("");
    };

    const toggleComplete = (index) => {
        setTasks(tasks.map((t, i) =>
            i === index ? { ...t, completed: !t.completed } : t
        ));
    };

    const removeTask = (index) => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            setTasks(tasks.filter((_, i) => i !== index));
        }
    };

    const startEditing = (index) => {
        setEditingIndex(index);
        setEditedTask(tasks[index].text);
    };

    const saveEdit = (index) => {
        if (editedTask.trim() === "") return alert("Task cannot be empty!");
        setTasks(tasks.map((t, i) =>
            i === index ? { ...t, text: editedTask } : t
        ));
        setEditingIndex(null);
        setEditedTask("");
    };

    const filteredTasks = tasks.filter(task => {
        if (filter === "completed") return task.completed;
        if (filter === "pending") return !task.completed;
        return true;
    });

    return (
        <div className="todo-container">
            <h2>To-Do List</h2>
            <div className="input-container">
                <input 
                    type="text" 
                    placeholder="Add a new task..." 
                    value={task} 
                    onChange={(e) => setTask(e.target.value)} 
                />
                <button className="add-btn" onClick={addTask}>
                    <i className="fas fa-plus"></i> Add
                </button>
            </div>

            <div className="filter-container">
                <button className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>All</button>
                <button className={filter === "completed" ? "active" : ""} onClick={() => setFilter("completed")}>Completed</button>
                <button className={filter === "pending" ? "active" : ""} onClick={() => setFilter("pending")}>Pending</button>
            </div>

            <div className="task-list-container">
                <ul>
                    {filteredTasks.map((t, index) => (
                        <li key={index}>
                            <input 
                                type="checkbox" 
                                checked={t.completed} 
                                onChange={() => toggleComplete(index)} 
                            />
                            
                            {editingIndex === index ? (
                                <input 
                                    type="text" 
                                    value={editedTask} 
                                    onChange={(e) => setEditedTask(e.target.value)} 
                                    autoFocus
                                />
                            ) : (
                                <span className={t.completed ? "completed task-text" : "task-text"}>{t.text}</span>
                            )}

                            <div className="task-actions">
                                {editingIndex === index ? (
                                    <button className="save-btn" onClick={() => saveEdit(index)}>
                                        <i className="fas fa-save"></i>
                                    </button>
                                ) : (
                                    <button className="edit-btn" onClick={() => startEditing(index)}>
                                        <i className="fas fa-edit"></i>
                                    </button>
                                )}
                                
                                <button className="delete-btn" onClick={() => removeTask(index)}>
                                    <i className="fas fa-trash"></i>
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
