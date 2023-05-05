import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import './Homepage.css';
import { getUserTasks } from '../../store/task';
import { getUserProjects } from '../../store/project';
import SingleTask from '../SingleTask';
import OpenModalButton from '../OpenModalButton';
import TaskForm from '../TaskForm';
import LeftMenu from '../LeftMenu';

function HomePage({ isLoaded }) {
    const dispatch = useDispatch();
    //const [openTaskForm, setOpenTaskForm] = useState(false);
    const [openCheckedTask, setOpenCheckedTask] = useState(false);
    const sessionUser = useSelector(state => state.session.user);
    const session = useSelector(state => state.session)
    const tasks = useSelector(state => state.task.AllTasks)
    let taskUncheckedOrdered = [];
    let taskCheckedOrdered = [];
    if (tasks) {
        taskUncheckedOrdered = Object.values(tasks).filter(task => task.checked === false).sort((a, b) => a.id - b.id)
        taskCheckedOrdered = Object.values(tasks).filter(task => task.checked === true).sort((a, b) => a.id - b.id)
    }

    const task = { task_name: '', description: '', priority: '', due_date: '', project_id: null }

    useEffect(() => {
        dispatch(getUserTasks(sessionUser.id))
        dispatch(getUserProjects(sessionUser.id))
    }, [dispatch])

    if (!sessionUser) return <Redirect to="/" />;
    if (!tasks) return (
        <>
            <h2>Unable to retrieve tasks. Please try again shortly. </h2>
        </>
    )

    return (
        <>
            <div className='home-page-content-container'>
                <div className='home-page-left-menu'>
                    <LeftMenu />
                </div>

                <div className='home-page-tasks-container'>
                    <div className='project-title-buttons-container'>
                        <h3>
                            Inbox
                        </h3>
                        <i class="fa-regular fa-circle-check" title='Show completed tasks' onClick={() => setOpenCheckedTask(!openCheckedTask)}></i>
                    </div>

                    <ul>
                        {tasks && taskUncheckedOrdered.map((task, idx) => (
                            <li className="home-page-task" key={idx}>
                                <SingleTask info={[task, session]} checkInd={false} />
                            </li>
                        )
                        )}
                    </ul>
                    <div className='add-task-button-container'>
                        <OpenModalButton
                            buttonText="Add Task"
                            modalComponent={<TaskForm user={sessionUser} task={task} formType="Create a New Task" />}
                        />
                        {/* <button type='button' onClick={() => setOpenTaskForm(!openTaskForm)} >Add Task</button>
                        <div className={`${openTaskForm ? "show" : "hidden"}`}>
                            <TaskForm />
                        </div> */}
                    </div>
                    <div className={`checked-tasks-cotainer ${openCheckedTask ? "show" : "hidden"}`} >
                        <h3>Completed Tasks</h3>
                        <ul>
                            {tasks && taskCheckedOrdered.map((task, idx) => (
                                <li className="home-page-task" key={idx}>
                                    <SingleTask info={[task, session]} checkInd={true} />
                                </li>
                            )
                            )}
                        </ul>
                    </div>
                </div>
                <div className='home-page-right-menu'>

                </div>
            </div>

        </>
    );
}

export default HomePage;
