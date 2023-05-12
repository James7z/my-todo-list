import { useDispatch, useSelector } from "react-redux";
import './TaskDetails.css';
import DeleteTaskModal from '../DeleteTaskModal';
import OpenModalButton from '../OpenModalButton';
import CommentOptionsMenu from '../CommentOptionsMenu'
import DeleteCommentModal from "../CommentOptionsMenu/DeleteCommentModal";
import TaskForm from '../TaskForm';
import { checkATask } from '../../store/task';
import { createATaskComment, updateAComment, deleteComment } from "../../store/task";
import { useState } from "react";

function TaskDetails({ info, checkInd }) {
    const [task, session] = info;
    const [comment, setComment] = useState('');
    const [commentErrors, setCommentErrors] = useState('');
    const [openComments, setOpenComments] = useState(false);
    const [viewStat, setViewStat] = useState("comments");
    const [updateComment, setUpdateComment] = useState("");
    const [isDifferent, setIsDifferent] = useState(false)
    const [updatingComment, setUpdatingComment] = useState(false);
    const [focusedComment, setFocusedComment] = useState(0)
    const comments = useSelector(state => state.task.AllTasks[task.id]?.comments)
    const dispatch = useDispatch();

    function sortComments(comments) {
        const arr = []
        for (const id in comments) {
            arr.push(comments[id])
        }
        arr.sort(function (a, b) {
            if (a.id < b.id) return 1;
            if (a.id > b.id) return -1;
            return 0;
        })
        return arr
    }

    const orderedComments = sortComments(comments)
    // console.log("***************orderedComments ares")
    // console.log(orderedComments)

    const handleCheckTask = () => {
        dispatch(checkATask(task.id));
    };

    // console.log(task)

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (comment.length < 1) return;
        let errors = [];
        if (comment.length > 2000) errors.push("Please provide a comment less than 2000 characters")

        if (errors.length > 0) return setCommentErrors(errors)
        const commentObj = { comment: comment, image_url: "", user_id: session.user.id }
        //console.log(commentObj)
        dispatch(createATaskComment(task.id, commentObj))
        setComment("");
    }

    const handleEditing = (text, curr) => {
        setIsDifferent(text.value !== curr)
        setUpdateComment(text)
    }

    const handleEditCommentSubmit = async (e, userComment) => {
        e.preventDefault();

        if (userComment.user_id !== session.user.id) return;
        if (updateComment.length < 1) return;
        console.log("***********In handleEditCommentSubmit")
        console.log(updateComment)
        const commentObj = { comment: updateComment, image_url: "test_url", user_id: session.user.id }
        dispatch(updateAComment(userComment.id, commentObj));
        setUpdatingComment(false);
        setUpdateComment(updateComment)
        setComment("");
    }

    function setUpdating() {
        if (updatingComment) return;
        setUpdatingComment(true);
    }

    function setFocusComment(comment) {
        setFocusedComment(comment.id)
        setUpdating()
    }

    function commentDiv(userComment) {
        //console.log("***********In commentDiv", userComment)
        if (updatingComment && session.user.id === userComment.user_id
            && userComment.id === focusedComment
        ) {
            return <div className="task-details-comment">
                <textarea
                    maxLength="250"
                    className="edit-task-comment"
                    value={isDifferent ? updateComment : userComment.comment}
                    onChange={(e) => handleEditing(e.target.value, userComment.comment)}
                    autoFocus
                    onFocus={function (e) {
                        var val = e.target.value;
                        e.target.value = '';
                        e.target.value = val;
                    }}
                >
                </textarea>
                <div id="edit-comment-button-div">
                    <button className="edit-comment-button update"
                        onClick={(e) => handleEditCommentSubmit(e, userComment)}
                        disabled={updateComment === userComment.comment || updateComment.length === 0}
                    >Update</button>
                    <button className="edit-comment-button cancel"
                        onClick={() => {
                            setUpdatingComment(false);
                            setUpdateComment(userComment.comment);
                        }}
                    >Cancel</button>
                </div>
            </div>
        }
        return <div className="task-details-comment"
            onClick={() => session?.user?.id === userComment?.user_id ?
                setFocusComment(userComment)
                : ""
            }
        >
            {userComment.comment}
        </div>
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

                    {/* <span className='task-buttons-container'>
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
                    </span> */}
                    {/* <div className="task-details-comments">
                        <h4>Comments</h4>
                        {task.comments && task.comments.map((comment, idx) => (
                            <div className="task-details-comment" key={idx}>

                                <span>{comment.user.username} </span>
                                <span>{comment.updatedAtStr} </span>
                                <div>{comment.comment}</div>
                            </div>
                        )
                        )}
                    </div> */}
                    <div className="task-react-options-container">
                        <div className="task-comments-options">
                            <div className={`view-comments-button ${openComments ? "hidden" : "show"}`} onClick={() => setOpenComments(!openComments)}>
                                {task?.comments?.length} Comments
                            </div>
                            <div className={`close-comments-button ${openComments ? "show" : "hidden"}`} onClick={() => setOpenComments(!openComments)}>
                                <i className="fa-solid fa-x fa-xs close-comments-button-image" />
                                <p className="close-notes-button-text">Close comments</p>
                            </div>
                            <div className="comment-button-container">
                                <i className={"fa-sharp fa-regular fa-comment fa-xl comment-button"} onClick={() => setOpenComments(!openComments)} />

                            </div>
                        </div>
                    </div>
                    <div className={`task-comment-section-container ${!openComments && "hidden"}`}>
                        <div className={openComments ? "task-comments-container" : "hidden"}>
                            <div className="task-stats-container">
                                <div className="task-stats">
                                    <div className={`task-comment-count-container ${viewStat === "comments" && "viewing"}`} onClick={() => setViewStat('comments')}>
                                        <i className="fa-sharp fa-regular fa-comment fa-lg comment-button" />
                                        <div className="task-comment-count">{task?.comments?.length}</div>
                                    </div>
                                </div>
                            </div>
                            <div className={`make-comment-container ${(!session?.user || viewStat !== "comments") && "hidden"}`}>
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
                            <div className={`comments-container ${viewStat !== "comments" && "hidden"} ${task.comments.length ? "" : "empty"}`}>
                                {task.comments.length ? orderedComments.map((comment, idx) => (
                                    <div className="task-comment-container" key={idx}>
                                        <div className="task-commenter-information-container"
                                            onClick={() => session?.user?.id === comment?.user_id ? setFocusComment(comment) : ""}
                                        >

                                            <div className="task-comment-box">
                                                <div className="task-commenter-username">
                                                    <p className="task-commenter-p">{comment.user.username}</p>
                                                    <p className="task-commenter-p2">
                                                        {!updatingComment && session?.user?.id === comment?.user?.id ? "Click to update" : ""}
                                                    </p>
                                                </div>
                                                {commentDiv(comment)}
                                            </div>
                                        </div>
                                        {/* <div className={`origional-commenter-options-container ${comment?.user_id !== session?.user?.id && "hidden"}`}>
                                            <CommentOptionsMenu commentId={comment.id} />
                                        </div> */}
                                        <div title="Delete task">
                                            <OpenModalButton
                                                icon={"fa-solid fa-trash-can"}
                                                modalComponent={<DeleteCommentModal commentId={comment.id} />}
                                            />

                                        </div>
                                    </div>
                                ))
                                    :
                                    <div className="no-comments-message-container">
                                        <i className="fa-regular fa-comment fa-2xl no-comments-message-icon" />
                                        <div className="no-comments-message">Be the first to Reply!</div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className='task-details-container-right'>
                    <div className="task-details-container-right-text">
                        Due date:
                    </div>
                    <div className="task-details-container-right-content">
                        {task.due_date}
                    </div>
                    <div className="task-details-container-right-text">
                        Project:
                    </div>
                    <div className="task-details-container-right-content">
                        {task.project_name}
                    </div>
                    <div className="task-details-container-right-text">
                        Priority:
                    </div>
                    <div className="task-details-container-right-content">
                        <i className={`fa-solid fa-flag priority-${task.priority}`}></i>   {`P${task.priority}`}
                    </div>
                    <div className="task-details-container-right-text">
                        Labels :
                    </div>
                    <div className="task-details-container-right-content">
                        {task.labels ? task.labels.map(label => (<span>{`#${label.label_name} `}</span>)) : ""}
                    </div>
                </div>
            </div>


        </>
    )
}



export default TaskDetails;
