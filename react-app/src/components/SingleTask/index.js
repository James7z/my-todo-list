import { useDispatch } from "react-redux";
import './SingleTask.css';
import DeleteTaskModal from '../DeleteTaskModal';
import OpenModalButton from '../OpenModalButton';
import TaskForm from '../TaskForm';
import TaskDetails from "../TaskDetails";
import { checkATask } from '../../store/task';

function SingleTask({ info, checkInd }) {
    const [task, session] = info;
    console.log(checkInd)
    const dispatch = useDispatch();
    const handleCheckTask = () => {
        // window.alert("Task id is", task.id)
        dispatch(checkATask(task.id));
    };

    return (
        <>

            <div className='single-task-container' >
                <span className='single-task-content-container'>
                    <button id='check-task-button' onClick={handleCheckTask} title="Check task">
                        <div className={`task-checkbox-circle priority-${task.priority}`} >
                            <i className={`fa-solid fa-check ${checkInd ? "show" : "hidden"}`}></i>
                        </div>
                    </button>
                    <span className='single-task-name-due-date-container'>
                        <div>
                            {task.task_name}
                        </div>
                        <div className="single-task-description">
                            {task.description}
                        </div>
                        <div className='single-task-date-comment-container' >
                            <span>
                                Due date: {task.due_date}
                            </span>
                            <span title="Comment on task" >
                                <OpenModalButton
                                    icon={"fa-regular fa-comment"}
                                    modalComponent={<TaskDetails info={info} />}
                                />
                            </span>

                        </div>

                    </span>
                </span>
                <span className='task-buttons-container'>
                    <span title="Update task">
                        <OpenModalButton
                            icon={"fa-regular fa-pen-to-square"}
                            modalComponent={<TaskForm user={session.user} task={task} formType="Update a Task" />}
                        />
                    </span>
                    <span>
                        <button onClick={() => window.alert("Comments feature coming soon.")} title="Comment on task">
                            <i class="fa-regular fa-comment"></i>
                        </button>
                    </span>
                    <span title="Delete task">
                        <OpenModalButton
                            icon={"fa-solid fa-trash-can"}
                            modalComponent={<DeleteTaskModal taskId={task.id} userId={session.user.id} />}
                        />

                    </span>
                </span>

            </div>

        </>
    )
}



export default SingleTask;
