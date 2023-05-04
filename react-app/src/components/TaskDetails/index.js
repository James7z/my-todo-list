import { useDispatch } from "react-redux";
import './TaskDetails.css';
import DeleteTaskModal from '../DeleteTaskModal';
import OpenModalButton from '../OpenModalButton';
import TaskForm from '../TaskForm';
import { checkATask } from '../../store/task';

function TaskDetails({ info }) {
    const [task, session] = info;
    const dispatch = useDispatch();
    const handleCheckTask = () => {
        dispatch(checkATask(task.id));
    };

    // console.log(task)

    return (
        <>
            <div className='task-details-container' >
                <span className='task-details-content-container'>
                    <div className="task-details-name-description-container">
                        <button id='check-task-button' onClick={handleCheckTask} title="Check task">
                            <i class="fa-regular fa-circle fa-xl" ></i>
                        </button>
                        <span className='task-details-name-description'>
                            <div>
                                {task.task_name}
                            </div>
                            <div className="single-task-description">
                                {task.description ? task.description : "Description"}
                            </div>
                            <div className='single-task-date-comment-container' >
                                <span>
                                    Due date: {task.due_date}
                                </span>
                                <span onClick={() => window.alert("Comments feature coming soon.")} title="Comment on task" >
                                    <i class="fa-regular fa-comment"></i>
                                </span>

                            </div>

                        </span>
                    </div>

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
                <div className="task-details-comments">
                    <h4>Comments</h4>
                    {task.comments && task.comments.map((comment, idx) => (
                        <div className="task-details-comment" key={idx}>

                            <span>{comment.user.username} </span> <span>{comment.updatedAt}</span>
                            <div>{comment.comment}</div>

                        </div>
                    )
                    )}
                    {/* <div >
                        <form className="type-comment-box-container" onSubmit={handleCommentSubmit}>
                            <textarea className="type-comment-box"
                                rows="1"
                                type="text"
                                value={comment}
                                placeholder="Comment"
                                onChange={(e) => setComment(e.target.value)}
                            />
                            <button className="submit-comment-button"
                                type="submit"
                                disabled={comment === ""}
                            >
                                Reply
                            </button>
                        </form>
                    </div> */}

                </div>
            </div>


        </>
    )
}



export default TaskDetails;
