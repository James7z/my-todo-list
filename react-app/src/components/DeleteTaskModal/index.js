import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteTask } from "../../store/task";
import "./DeleteTaskModal.css";




const DeleteTaskModal = ({ taskId, userId }) => {

    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = () => {

        dispatch(deleteTask(taskId, userId))
            .then(closeModal)
    }

    return (
        <>
            <h2 id="delete-modal-prompt">Are you sure you want to delete this task?</h2>
            <div id="delete-modal-buttons-container">
                <div id="cancel-delete-task-button" onClick={closeModal}>Cancel</div>
                <div id="delete-task-button" onClick={handleDelete}>OK</div>
            </div>
        </>
    )
};

export default DeleteTaskModal;
