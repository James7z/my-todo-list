import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { createAUserLabel, updateAUserLabel } from "../../store/label";
import './LabelForm.css'

export default function LableForm({ label, formType, userId }) {
    const [label_name, setLabelName] = useState(label.label_name);
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();
    const dispatch = useDispatch();


    let titleStr = '';
    let buttonStr = '';
    if (formType === "Create a New Label") {
        titleStr = 'Add label'
        buttonStr = "Add";
    }
    if (formType === "Update a Label") {
        titleStr = 'Update label'
        buttonStr = "Update";
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const labelObj = { label_name }

        let errors = [];

        if (label_name.length > 50) errors.push("Please provide a label name less than 50 characters")

        if (errors.length > 0) return setErrors(errors)

        if (formType === "Create a New Label") {
            dispatch(createAUserLabel(userId, labelObj))
                .then(closeModal)
        }
        if (formType === "Update a Label") {
            dispatch(updateAUserLabel(label.id, labelObj))
                .then(closeModal)
        }

    }

    return (
        <>

            <form onSubmit={handleSubmit} className={`label-editor-form`}  >
                {/* <h2>
                    {titleStr}
                </h2> */}
                <ul>
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
                <div className="label-editor-editing-area">
                    <div className="label-editor-input-fields">
                        <div>
                            <label>Label Name</label>
                            <input
                                type="text"
                                value={label_name}
                                placeholder="Enter your label Name"
                                onChange={(e) => setLabelName(e.target.value)}
                                required
                            />
                        </div>

                    </div>
                </div>

                <div className="label-editor-footer label-editor-input-fields">
                    <div className="label-editor-footer-buttons-container">
                        <button type="button" onClick={() => closeModal()} >Cancel</button>
                        <button type="submit" >{buttonStr} </button>
                    </div>

                </div>

            </form>

        </>

    )
}
