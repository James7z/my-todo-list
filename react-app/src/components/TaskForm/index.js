import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import './TaskForm.css'

export default function TaskForm({ task, formType }) {
    // Results below assume UTC timezone - your results may vary
    const dateStr = new Intl.DateTimeFormat('en-US').format(Date.now())
    const [taskName, setTaskName] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState(dateStr)
    const [errors, setErrors] = useState([]);


    const handleSubmit = async (e) => {
        e.preventDefault();
    }

    const handleRemoveDueDate = () => {
        setDueDate("")
    }
    return (
        <>
            <h1>Task Form</h1>
            <form onSubmit={handleSubmit} className="task-editor-form" >
                <ul>
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
                <div className="task-editor-editing-area">
                    <div className="task-editor-input-fields">
                        <div>
                            <input
                                type="text"
                                value={taskName}
                                placeholder="Task Name"
                                onChange={(e) => setTaskName(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                value={description}
                                placeholder="Description"
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="task-editor-due-date-priority">

                        <div aria-label="Set due date" role="button" tabindex="0" >
                            <div >
                                <i class="fas fa-calendar-alt"></i>
                                <input
                                    type="text"
                                    value={dueDate}
                                    placeholder="MM/DD/YYYY"
                                    onChange={(e) => setDueDate(e.target.value)}
                                    required
                                />
                                <button aria-label="Remove due date" type="button" aria-disabled="false" tabindex="0"
                                    onClick={() => handleRemoveDueDate()}
                                >
                                    <i class="fas fa-times"></i>
                                </button>
                            </div>
                        </div>

                        <div>
                            <label for="priority">Priority:</label>
                            <select name="priority" id="priority">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>
                        </div>
                    </div>


                </div>

                <div className="task_editor__footer">
                    <button type="submit">Add Task</button>
                </div>

            </form>

        </>
    );
}
