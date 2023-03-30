import { useDispatch } from "react-redux";
import './SingleTask.css';
import DeleteTaskModal from '../DeleteTaskModal';
import OpenModalButton from '../OpenModalButton';
import TaskForm from '../TaskForm';
import { checkATask } from '../../store/task';

function SingleTask({ info }) {
    const [task, session] = info;
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
                        <i class="fa-regular fa-circle fa-xl" ></i>
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
                            <span onClick={() => window.alert("Comments feature coming soon.")} title="Comment on task">
                                <i class="fa-regular fa-comment"></i>
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
                    <span>
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