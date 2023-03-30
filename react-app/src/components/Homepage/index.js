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
    const [openTaskForm, setOpenTaskForm] = useState(false);
    const sessionUser = useSelector(state => state.session.user);
    const session = useSelector(state => state.session)
    const tasks = useSelector(state => state.task.userTasks)
    const task = { task_name: '', description: '', priority: '', due_date: '', project_id: null }

    useEffect(() => {
        dispatch(getUserTasks(sessionUser.id))
        dispatch(getUserProjects(sessionUser.id))
    }, [dispatch])

    if (!sessionUser) return <Redirect to="/" />;

    return (
        <>
            <div className='home-page-content-container'>
                <div className='home-page-left-menu'>
                    <LeftMenu />
                </div>

                <div className='home-page-tasks-container'>
                    <h3>
                        Inbox
                    </h3>
                    <ul>
                        {tasks && tasks.map((task, idx) => (
                            <li className="home-page-task" key={idx}>
                                <SingleTask info={[task, session]} />
                            </li>
                        )
                        )}
                    </ul>
                    <div>
                        <OpenModalButton
                            buttonText="Add Task"
                            modalComponent={<TaskForm user={sessionUser} task={task} formType="Create a New Task" />}
                        />
                        {/* <button type='button' onClick={() => setOpenTaskForm(!openTaskForm)} >Add Task</button>
                        <div className={`${openTaskForm ? "show" : "hidden"}`}>
                            <TaskForm />
                        </div> */}
                    </div>
                </div>
                <div className='home-page-right-menu'>

                </div>
            </div>

        </>
    );
}

export default HomePage;
