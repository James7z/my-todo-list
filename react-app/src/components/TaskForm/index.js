import React, { useEffect, useState } from "react";
import Select from 'react-select';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { createAUserTask, updateATask } from "../../store/task";
import './TaskForm.css'

export default function TaskForm({ task, formType, user }) {
    // Results below assume UTC timezone - your results may vary
    // console.log("---------------------------")
    const dateStr = new Intl.DateTimeFormat('en-US').format(Date.now())
    const [taskName, setTaskName] = useState(task.task_name);
    const [description, setDescription] = useState(task.description);
    const [dueDateStr, setDueDateStr] = useState(task.due_date ? new Intl.DateTimeFormat('en-US').format((new Date(task.due_date_string.slice(0, 26)))) : dateStr)
    const [priority, setPriority] = useState(task.priority || "4")
    const [project_id, setProjectId] = useState(task.project_id || 0)
    const [label_ids, setLabelIds] = useState(task.label_ids || "")
    const [showLabels, setShowLabels] = useState(false)
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();
    const projects = useSelector(state => state.project.UserProjects);
    const labels = useSelector(state => state.label.UserLabels);
    const labelsArr = Object.values(labels)
    const dispatch = useDispatch();
    let labelOptions = [];
    labelsArr.forEach(el => {
        labelOptions.push({ value: el.id, label: el.label_name })
    });
    let taskLabels = [];
    if (label_ids) label_ids.split(',').forEach(id => taskLabels.push({ value: id, label: labels[id].label_name }))

    const [selectedOption, setSelectedOption] = useState(label_ids ? taskLabels : null);

    let buttonStr = '';
    if (formType === "Create a New Task") buttonStr = "Submit";
    if (formType === "Update a Task") {
        buttonStr = "Update";
    }
    //console.log("label ids are", taskLabels)
    const handleSubmit = async (e) => {
        e.preventDefault();
        let errors = [];

        if (taskName.length > 50) errors.push("Please provide a task name less than 50 characters")
        if (description.length > 2000) errors.push("Please provide a description less than 2000 characters")

        if (errors.length > 0) return setErrors(errors)

        let dueDate = (new Date(dueDateStr)).toISOString().slice(0, 10);
        let label_ids_str = selectedOption.map(el => el.value).join(',')
        console.log("handle submit", label_ids_str)
        const taskObj = { task_name: taskName, description: description, priority: priority, due_date: dueDate, project_id: project_id, label_ids: label_ids_str }
        //console.log(selectedOption)
        //console.log(label_ids)
        if (formType === "Create a New Task") {
            dispatch(createAUserTask(user.id, taskObj))
                .then(closeModal)
        }
        if (formType === "Update a Task") {
            dispatch(updateATask(task.id, taskObj))
                .then(closeModal)
        }

    }

    const handleRemoveDueDate = () => {
        setDueDateStr("")
    }

    const handleChange = (e) => {
        let value = Array.from(e.target.selectedOptions, option => option.value);
        setLabelIds({ values: value });
    }

    return (
        <>
            <form onSubmit={handleSubmit} className={`task-editor-form `}  >
                <ul>
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
                <div className="task-editor-editing-area">
                    <div className="task-editor-input-fields">
                        <div>
                            <label>Task Name</label>
                            <input
                                type="text"
                                value={taskName}
                                placeholder="Task Name (required)"
                                onChange={(e) => setTaskName(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>Description</label>
                            <input
                                type="text"
                                value={description}
                                placeholder="Description (optional)"
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="task-editor-due-date-priority">

                        <div aria-label="Set due date"   >
                            <div className="task-editor-due-date">
                                <label>Due Date <br></br> </label>
                                <i class="fas fa-calendar-alt"></i>
                                <input
                                    type="text"
                                    value={dueDateStr}
                                    placeholder="MM/DD/YYYY"
                                    onChange={(e) => setDueDateStr(e.target.value)}
                                    required
                                />
                                <button aria-label="Remove due date" type="button" aria-disabled="false" tabindex="0"
                                    onClick={() => handleRemoveDueDate()}
                                >
                                    <i class="fas fa-times"></i>
                                </button>
                            </div>
                        </div>

                        <div className="task-editor-priority-container">
                            <label for="priority">Priority: <br></br> </label>
                            <select name="priority" id="priority" onChange={(e) => setPriority(e.target.value)}>
                                <option value="1" selected={1 == priority}>1</option>
                                <option value="2" selected={2 == priority}>2</option>
                                <option value="3" selected={3 == priority}>3</option>
                                <option value="4" selected={4 == priority}>4</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="task-editor-footer">
                    <span >
                        <label>Project <br></br> </label>
                        <select name="task-form-project" id="task-form-project" onChange={(e) => setProjectId(Number(e.target.value))} >
                            <option value={0}>Inbox</option>
                            {projects && Object.values(projects).map(project => (
                                <option value={`${project.id}`} selected={project.id == task.project_id}>{project.project_name}</option>
                            ))}
                        </select>
                    </span>

                    <div className="label-container">
                        <label>Label <br></br> </label>
                        <Select
                            defaultValue={selectedOption}
                            isMulti
                            name="labels"
                            options={labelOptions}
                            onChange={setSelectedOption}
                            className="basic-multi-select"
                            classNamePrefix="select"
                        />

                    </div>

                    <div className="task-editor-footer-buttons-container">
                        <button type="button" onClick={() => closeModal()} >Cancel</button>
                        <button type="submit" >{buttonStr} </button>
                    </div>

                </div>

            </form>

        </>
    );
}
