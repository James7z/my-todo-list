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

            <div className='home-page-content-container'>

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
                            modalComponent={<TaskForm />}
                        />
                    </div>
                </div>
            </div>

        </>
    );
}

export default HomePage;
