import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import './ProjectTasks.css'
import { getSingleLabel, getUserLabels } from "../../store/label";
import { getLabelTask } from "../../store/task";
import SingleTask from "../SingleTask";
import TaskForm from "../TaskForm";
import LeftMenu from '../LeftMenu';

export default function LabelTasks() {
    const dispatch = useDispatch();
    const { labelId } = useParams();
    const [openCheckedTask, setOpenCheckedTask] = useState(false);
    const session = useSelector(state => state.session);
    const tasks = useSelector(state => state.task.AllTasks);
    const label = useSelector(state => {
        if (state.label) return state.label.SingleLabel
    })
    let taskUncheckedOrdered = [];
    let taskCheckedOrdered = [];
    if (tasks && label) {
        taskUncheckedOrdered = Object.values(tasks).filter(task => task.checked === false).sort((a, b) => a.id - b.id);
        taskCheckedOrdered = Object.values(tasks).filter(task => task.checked === true).sort((a, b) => a.id - b.id)
    }
    const sessionUser = session.user
    const task = { task_name: '', description: '', priority: '', due_date: '', project_id: null, label_ids: "" }


    useEffect(() => {
        dispatch(getSingleLabel(labelId))
        dispatch(getUserLabels(sessionUser.id))
        dispatch(getLabelTask(labelId))
    }, [dispatch, labelId])


    if (!sessionUser) return <Redirect to="/" />;

    if (!label) {
        return (
            <>
                <h1>Unable to retrieve label. Please try again shortly. </h1>
            </>
        )
    }
    if (label.id === 0) return <Redirect to='/home' />;


    return (
        <>
            <div className='project-page-content-container'>
                <div className='project-page-left-menu'>
                    <LeftMenu />
                </div>
                <div className='project-page-tasks-container'>
                    <div className='project-title-buttons-container'>
                        <h3>
                            {label.label_name}
                        </h3>
                        <i class="fa-regular fa-circle-check" title='Show completed tasks' onClick={() => setOpenCheckedTask(!openCheckedTask)}></i>
                    </div>

                    <ul>
                        {tasks && taskUncheckedOrdered.map((task, idx) => (
                            <li className="project-page-task" key={idx}>
                                <SingleTask info={[task, session]} />
                            </li>
                        )
                        )}
                    </ul>
                    <div className='add-task-button-container'>
                        <OpenModalButton
                            buttonText="Add Task"
                            modalComponent={<TaskForm user={sessionUser} task={task} formType="Create a New Task" />}
                        />

                    </div>
                    <div className={`checked-tasks-cotainer ${openCheckedTask ? "show" : "hidden"}`} >
                        <h3>Completed Tasks</h3>
                        <ul>
                            {tasks && taskCheckedOrdered.map((task, idx) => (
                                <li className="home-page-task" key={idx}>
                                    <SingleTask info={[task, session]} />
                                </li>
                            )
                            )}
                        </ul>
                    </div>
                </div>
                <div className='project-page-right-menu'>

                </div>
            </div>
        </>
    )
}
