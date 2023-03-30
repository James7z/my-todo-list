import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import './ProjectTasks.css'
import { getSingleProject } from "../../store/project";
import { getUserProjects } from '../../store/project';
import SingleTask from "../SingleTask";
import TaskForm from "../TaskForm";
import LeftMenu from '../LeftMenu';

export default function ProjectTasks() {
    const dispatch = useDispatch();
    const { projectId } = useParams();
    const session = useSelector(state => state.session)
    const sessionUser = session.user
    const project = useSelector(state => {
        if (state.project) return state.project.SingleProject
    })
    const task = { task_name: '', description: '', priority: '', due_date: '', project_id: projectId }


    useEffect(() => {
        dispatch(getSingleProject(projectId))
        dispatch(getUserProjects(sessionUser.id))
    }, [dispatch, projectId])


    if (!sessionUser) return <Redirect to="/" />;
    let tasks = []
    if (project) {
        tasks = project.tasks
    } else {
        return (
            <>
                <h1>Unable to retrieve project. Please try again shortly. </h1>
            </>
        )
    }


    return (
        <>
            <div className='project-page-content-container'>
                <div className='project-page-left-menu'>
                    <LeftMenu />
                </div>
                <div className='project-page-tasks-container'>
                    <h3>
                        {project.project_name}
                    </h3>
                    <ul>
                        {tasks && tasks.map((task, idx) => (
                            <li className="project-page-task" key={idx}>
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

                    </div>
                </div>
                <div className='project-page-right-menu'>

                </div>
            </div>
        </>
    )
}
