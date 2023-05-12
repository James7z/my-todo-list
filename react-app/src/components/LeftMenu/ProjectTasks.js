import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import './ProjectTasks.css'
import { getSingleProject, getUserProjects } from "../../store/project";
import { getProjectTask } from "../../store/task";
import { getUserLabels } from '../../store/label';
import SingleTask from "../SingleTask";
import TaskForm from "../TaskForm";
import LeftMenu from '.';

export default function ProjectTasks() {
    const dispatch = useDispatch();
    const { projectId } = useParams();
    const [openCheckedTask, setOpenCheckedTask] = useState(false);
    const session = useSelector(state => state.session);
    const tasks = useSelector(state => state.task.AllTasks);
    const project = useSelector(state => {
        if (state.project) return state.project.SingleProject
    })
    let taskUncheckedOrdered = [];
    let taskCheckedOrdered = [];
    if (tasks && project) {
        taskUncheckedOrdered = Object.values(tasks).filter(task => task.checked === false && task.project_id === project.id).sort((a, b) => a.id - b.id);
        taskCheckedOrdered = Object.values(tasks).filter(task => task.checked === true && task.project_id === project.id).sort((a, b) => a.id - b.id)
    }
    const sessionUser = session.user
    const task = { task_name: '', description: '', priority: '', due_date: '', project_id: projectId, label_ids: "" }


    useEffect(() => {
        dispatch(getSingleProject(projectId))
        dispatch(getUserProjects(sessionUser.id))
        dispatch(getProjectTask(projectId))
        dispatch(getUserLabels(sessionUser.id))
    }, [dispatch, projectId])


    if (!sessionUser) return <Redirect to="/" />;

    if (!project) {
        return (
            <>
                <h1>Unable to retrieve project. Please try again shortly. </h1>
            </>
        )
    }
    if (project.id === 0) return <Redirect to='/home' />;


    return (
        <>
            <div className='project-page-content-container'>
                <div className='project-page-left-menu'>
                    <LeftMenu />
                </div>
                <div className='project-page-tasks-container'>
                    <div className='project-title-buttons-container'>
                        <h3>
                            {project.project_name}
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
