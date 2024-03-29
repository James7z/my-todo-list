import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { createAUserProject, updateAUserProject } from "../../store/project";
import './ProjectForm.css'

export default function CommentDetails({ comment, formType, userId }) {
    const [comment_name, setCommentName] = useState(comment.project_name);
    const [color, setColor] = useState(comment.color || "Red");
    const [view_type, setViewType] = useState(comment.view_type || "List")
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const colors = ["Red", "Orange", "Yellow", "Blue", "Green", "Teal", "Grey", "Lavender"]
    const viewTypes = ["List", "Board"]

    let titleStr = '';
    let buttonStr = '';
    if (formType === "Create a New Comment") {
        titleStr = 'Add comment'
        buttonStr = "Add";
    }
    if (formType === "Update a Comment") {
        titleStr = 'Update comment'
        buttonStr = "Update";
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const commentObj = { comment_name, color, view_type }

        let errors = [];

        if (comment_name.length > 50) errors.push("Please provide a comment name less than 50 characters")

        if (errors.length > 0) return setErrors(errors)
        //console.log(projectObj)
        if (formType === "Create a New Comment") {
            dispatch(createAUserComment(userId, commentObj))
                .then(closeModal)
        }
        if (formType === "Update a Comment") {
            dispatch(updateAUserComment(comment.id, commentObj))
                .then(closeModal)
        }

    }

    return (
        <>

            <form onSubmit={handleSubmit} className={`project-editor-form`}  >
                <h2>
                    {titleStr}
                </h2>
                <ul>
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
                <div className="project-editor-editing-area">
                    <div className="project-editor-input-fields">
                        <div>
                            <label>Project Name</label>
                            <input
                                type="text"
                                value={project_name}
                                placeholder="Enter your project Name"
                                onChange={(e) => setProjectName(e.target.value)}
                                required
                            />
                        </div>

                    </div>
                    <div className="project-editor-color project-editor-input-fields">
                        <div>
                            <label for="color">Color:</label>
                            <select name="color" id="color" onChange={(e) => setColor(e.target.value)}>
                                {colors.map(item => (
                                    <option value={`${item}`} selected={item == color}>{item}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="project-editor-view-type project-editor-input-fields">
                        <div>
                            <label for="viewType">View Type:</label>
                            <select name="viewType" id="viewType" onChange={(e) => setViewType(e.target.value)}>
                                {viewTypes.map(item => (
                                    <option value={`${item}`} selected={item == view_type}>{item}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="project-editor-footer project-editor-input-fields">
                    <div className="project-editor-footer-buttons-container">
                        <button type="button" onClick={() => closeModal()} >Cancel</button>
                        <button type="submit" >{buttonStr} </button>
                    </div>

                </div>

            </form>
            <div className={`projects-list-container ${openLabelList ? "show" : "hidden"}`} >
                {labels && Object.values(labels).map((label, idx) => (
                    <>
                        <div className='project-list-container'>
                            <NavLink to={`/labels/${label.id}`} className="project-tasks-link">
                                <div className='project-list-project-name'>
                                    {label.label_name}
                                </div>
                            </NavLink>
                            <div className='project-list-action-container'>
                                <span  >
                                    <OpenModalButton
                                        className="project-action-button"
                                        buttonText={<i className="fa-regular fa-pen-to-square" title='Edit label'>  </i>}
                                        modalComponent={<LabelForm label={label} userId={sessionUser.id} formType="Update a Label" />} />
                                </span>
                                <span>
                                    <OpenModalButton
                                        className="project-action-button"
                                        buttonText={<i className="fa-solid fa-trash-can" title='Delete label'>  </i>}
                                        modalComponent={<DeleteLabelModal labelId={label.id} userId={sessionUser.id} />} />
                                </span>
                            </div>

                        </div>

                    </>
                ))}
            </div>
            <div className="welcome-page">
                <div className='welcome-message'>
                    <h1>
                        Become organized and focused.
                    </h1>
                    <h2>
                        Organize your work and life with MyTodoList
                    </h2>
                </div>


                <div className="welcome-page-signup-button">
                    <OpenModalButton

                        buttonText="Start for free"
                        modalComponent={<SignupFormModal />}
                    />
                </div>
                <div className="welcome-page-background-pic">
                    <img src={bgImgUrl} alt="" class="IntroSection_wrapperIllustration__ZTMyV"></img>

                </div>
            </div>

            <div className="log-in-form-container">


                <form onSubmit={handleSubmit} className="log-in-form">
                    <ul>
                        {errors.map((error, idx) => (
                            <li key={idx}>{error}</li>
                        ))}
                    </ul>
                    <div className="login-input-container">
                        <div>
                            {/* <label>
        Email
      </label> */}
                        </div>
                        <div>
                            <input
                                type="text"
                                value={email}
                                placeholder="Enter your email"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="login-input-container">
                        <div>
                            {/* <label>
        Password
      </label> */}
                        </div>
                        <div>
                            <input
                                type="password"
                                value={password}
                                placeholder="Enter your password"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <button type="submit" className="login-button">Log In</button>
                </form>
                <div className="demo-user-login-container">
                    <button onClick={signInDemoUser}>Login as demo user</button>
                </div>
            </div>

        </>

    )
}
