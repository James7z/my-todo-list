import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteLabel } from "../../store/label";

import "./LeftMenu.css";




const DeleteLabelModal = ({ labelId, userId }) => {

    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = () => {

        dispatch(deleteLabel(labelId, userId))
            .then(closeModal)
    }

    return (
        <>
            <h2 id="delete-label-modal-prompt">Are you sure you want to delete this label?</h2>
            <div id="delete-label-modal-buttons-container">
                <div id="cancel-delete-label-button" onClick={closeModal}>Cancel</div>
                <div id="delete-label-button" onClick={handleDelete}>OK</div>
            </div>
        </>
    )
};

export default DeleteLabelModal;
