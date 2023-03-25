import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import './Homepage.css';
import { getUsersTasks } from '../../store/task';
import SingleTask from '../SingleTask';
import OpenModalButton from '../OpenModalButton';
import TaskForm from '../TaskForm';

function HomePage({ isLoaded }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const session = useSelector(state => state.session)
    const tasks = useSelector(state => state.task.userTasks)

    useEffect(() => {
        dispatch(getUsersTasks(sessionUser.id))
    }, [dispatch])

    if (!sessionUser) return <Redirect to="/" />;

    return (
        <>
            <h2>
                Inbox
            </h2>
            <div className='home-page-tasks-container'>
                {tasks && tasks.map((task, idx) => (
                    <div className="home-page-task" key={idx}>
                        <SingleTask info={[task, session]} />
                    </div>
                )
                )}
            </div>
            <div>
                <OpenModalButton
                    buttonText="Add Task"

                    modalComponent={<TaskForm />}
                />
            </div>
        </>
    );
}

export default HomePage;
