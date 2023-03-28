import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import './ProjectTasks.css'
import { getSingleProject } from "../../store/project";
import SingleTask from "../SingleTask";

export default function ProjectTasks() {
    const dispatch = useDispatch();
    const { projectId } = useParams();
    const session = useSelector(state => state.session)
    const project = useSelector(state => {
        if (state.project) return state.project.SingleProject
    })


    useEffect(() => {
        dispatch(getSingleProject(projectId))
    }, [dispatch])


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
                {/* <div>
                    <OpenModalButton
                        buttonText="Add Task"
                        modalComponent={<TaskForm userId={sessionUser.id} task={task} formType="Create a New Task" />}
                    />

                </div> */}
            </div>
            <div className='home-page-right-menu'>

            </div>

        </>
    )
}
