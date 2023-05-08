import { useDispatch } from "react-redux";
import './TaskDetails.css';
import DeleteTaskModal from '../DeleteTaskModal';
import OpenModalButton from '../OpenModalButton';
import TaskForm from '../TaskForm';
import { checkATask } from '../../store/task';
import { useState } from "react";

function TaskDetails({ info, checkInd }) {
    const [task, session] = info;
    const [comment, setComment] = useState('');
    const [commentErrors, setCommentErrors] = useState('');
    const dispatch = useDispatch();
    const handleCheckTask = () => {
        dispatch(checkATask(task.id));
    };

    // console.log(task)

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        let errors = [];
        if (comment.length > 2000) errors.push("Please provide a comment less than 2000 characters")

        if (errors.length > 0) return setCommentErrors(errors)
        const commentObj = { comment: comment, image_url: "", user_id: session.user.id, task_id: task.id }
        //console.log(taskObj)
        // if (formType === "Create a New Task") {
        //     dispatch(createAUserTask(user.id, taskObj))
        //         .then(closeModal)
        // }
        // if (formType === "Update a Task") {
        //     dispatch(updateATask(task.id, taskObj))
        //         .then(closeModal)
        // }

    }

    return (
        <>
            <div className='task-details-container' >
                <div className='task-details-container-left'>
                    <span className='task-details-content-container'>
                        <div className="task-details-name-description-container">
                            <button id='check-task-button' onClick={handleCheckTask} title="Check task">
                                <div className={`task-checkbox-circle priority-${task.priority}`} >
                                    <i className={`fa-solid fa-check ${checkInd ? "show" : "hidden"}`}></i>
                                </div>
                            </button>
                            <div className='task-details-name-description'>
                                <div>
                                    {task.task_name}
                                </div>
                                <div className="single-task-description">
                                    {task.description ? task.description : "Description"}
                                </div>


                            </div>

                        </div>


                    </span>

                    <span className='task-buttons-container'>
                        <span title="Update task">
                            <OpenModalButton
                                icon={"fa-regular fa-pen-to-square"}
                                modalComponent={<TaskForm user={session.user} task={task} formType="Update a Task" />}
                            />
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

                                <span>{comment.user.username} </span>
                                <span>{comment.updatedAtStr} </span>
                                <div>{comment.comment}</div>
                            </div>
                        )
                        )}
                        <div >
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
                        </div>

                    </div>
                </div>
                <div className='task-details-container-right'>
                    <div>
                        Due date: {task.due_date}
                    </div>
                    <div>
                        Project: {task.project_name}
                    </div>
                    <div>
                        Priority: <i className={`fa-solid fa-flag priority-${task.priority}`}></i>   {`P${task.priority}`}
                    </div>
                </div>
            </div>


        </>
    )
}



export default TaskDetails;
