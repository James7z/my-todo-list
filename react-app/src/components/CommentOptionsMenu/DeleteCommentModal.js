import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteComment } from "../../store/task";
import "./CommentOptionsMenu.css"

const DeleteCommentModal = ({ commentId }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = () => {
        dispatch(deleteComment(commentId))
            .then(closeModal)
    }

    return (
        <div id="delete-comment-modal-container">
            <h2 id="delete-comment-modal-prompt">Do you want to delete this Comment?</h2>
            <div id="delete-comment-modal-buttons-container">
                <div id="cancel-delete-comment-button" onClick={closeModal}>Nevermind</div>
                <div id="delete-comment-button" onClick={handleDelete}>Delete this Comment</div>
            </div>
        </div>
    )
}

export default DeleteCommentModal
