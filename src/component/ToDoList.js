// src/ToDoList.js
import React, { useState } from 'react';

function ToDoList() {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState("");

    const addTask = () => {
        if (task !== "") {
            setTasks([...tasks, { text: task, completed: false, isEditing: false }]);
            setTask("");
        }
    };

    const toggleTask = (index) => {
        const newTasks = tasks.map((t, i) => {
            if (i === index) {
                return { ...t, completed: !t.completed };
            }
            return t;
        });
        setTasks(newTasks);
    };

    const deleteTask = (index) => {
        const newTasks = tasks.filter((t, i) => i !== index);
        setTasks(newTasks);
    };

    const editTask = (index) => {
        const newTasks = tasks.map((t, i) => {
            if (i === index) {
                return { ...t, isEditing: true };
            }
            return t;
        });
        setTasks(newTasks);
    };

    const saveTask = (index, newText) => {
        const newTasks = tasks.map((t, i) => {
            if (i === index) {
                return { ...t, text: newText, isEditing: false };
            }
            return t;
        });
        setTasks(newTasks);
    };

    return (
        <div>
            <h1>To-Do List</h1>
            <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Add a new task"
            />
            <button onClick={addTask}>Add Task</button>
            <ul>
                {tasks.map((t, index) => (
                    <li key={index} style={{ textDecoration: t.completed ? 'line-through' : 'none' }}>
                        {t.isEditing ? (
                            <input
                                type="text"
                                defaultValue={t.text}
                                onBlur={(e) => saveTask(index, e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        saveTask(index, e.target.value);
                                    }
                                }}
                                autoFocus
                            />
                        ) : (
                            <>
                                {t.text}
                                <button onClick={() => toggleTask(index)}>
                                    {t.completed ? 'Undo' : 'Complete'}
                                </button>
                                <button onClick={() => editTask(index)}>Edit</button>
                                <button onClick={() => deleteTask(index)}>Delete</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ToDoList;
