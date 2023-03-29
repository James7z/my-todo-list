import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteProject } from "../../store/project";

import "./LeftMenu.css";




const DeleteProjectModal = ({ projectId, userId }) => {

    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = () => {

        dispatch(deleteProject(projectId, userId))
            .then(closeModal)
    }

    return (
        <>
            <h2 id="delete-project-modal-prompt">Are you sure you want to delete this project?</h2>
            <div id="delete-project-modal-buttons-container">
                <div id="cancel-delete-project-button" onClick={closeModal}>Cancel</div>
                <div id="delete-project-button" onClick={handleDelete}>OK</div>
            </div>
        </>
    )
};

export default DeleteProjectModal;
