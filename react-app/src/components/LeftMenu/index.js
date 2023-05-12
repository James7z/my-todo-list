import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './LeftMenu.css';
import ProjectForm from '../ProjectForm';
import LabelForm from '../LabelForm';
import OpenModalButton from '../OpenModalButton';
import OpenModalMenuItem from '../OpenModalButton/OpenModalMenuItem';
import DeleteProjectModal from './DeleteProjectModal';
import DeleteLabelModal from './DeleteLabelModal';

function LeftMenu() {

    const [openProjectList, setOpenProjectList] = useState(true);
    const [openLabelList, setOpenLabelList] = useState(true);
    const sessionUser = useSelector(state => state.session.user);
    const projects = useSelector(state => state.project.UserProjects);
    const project = { project_name: '', color: '', view_type: '' }
    const labels = useSelector(state => state.label.UserLabels);
    const label = { label_name: '' }

    return (
        <>
            <div id="left-menu">
                <div>
                    <div data-expansion-panel-header="true" focus-marker-enabled-within>
                        <div>
                            <NavLink to={`/home`} className="project-tasks-link">
                                <h3>Inbox</h3>
                            </NavLink>
                        </div>
                        <div className='project-title-container'>
                            <h3>Project</h3>
                            <span>
                                <OpenModalButton
                                    className="project-action-button"
                                    buttonText={<i class="fa-solid fa-plus fa-lg" title='Add Project'></i>}
                                    modalComponent={<ProjectForm userId={sessionUser.id} project={project} formType="Create a New Project" />}
                                />
                                <i className={`${openProjectList ? "fa-solid fa-chevron-down" : "fa-solid fa-angle-left"}`}
                                    title='Toggle list of Projects'
                                    onClick={() => setOpenProjectList(!openProjectList)} />
                            </span>
                        </div>
                        <div className={`projects-list-container ${openProjectList ? "show" : "hidden"}`} >
                            {projects && Object.values(projects).map((project, idx) => (
                                <>
                                    <div className='project-list-container'>
                                        <NavLink to={`/projects/${project.id}`} className="project-tasks-link">
                                            <div className='project-list-project-name'>
                                                {project.project_name}
                                            </div>
                                        </NavLink>
                                        <div className='project-list-action-container'>
                                            <span  >
                                                <OpenModalButton
                                                    className="project-action-button"
                                                    buttonText={<i className="fa-regular fa-pen-to-square" title='Edit project'>  </i>}
                                                    modalComponent={<ProjectForm project={project} userId={sessionUser.id} formType="Update a Project" />} />
                                            </span>
                                            <span>
                                                <OpenModalButton
                                                    className="project-action-button"
                                                    buttonText={<i className="fa-solid fa-trash-can" title='Delete project'>  </i>}
                                                    modalComponent={<DeleteProjectModal projectId={project.id} userId={sessionUser.id} />} />
                                            </span>
                                        </div>

                                    </div>

                                </>
                            ))}
                        </div>
                        <div className='project-title-container'>
                            <h3>Label</h3>
                            <span>
                                <OpenModalButton
                                    className="project-action-button"
                                    buttonText={<i class="fa-solid fa-plus fa-lg" title='Add Label'></i>}
                                    modalComponent={<LabelForm userId={sessionUser.id} label={label} formType="Create a New Label" />}
                                />
                                <i className={`${openLabelList ? "fa-solid fa-chevron-down" : "fa-solid fa-angle-left"}`}
                                    title='Toggle list of Labels'
                                    onClick={() => setOpenLabelList(!openLabelList)} />
                            </span>
                        </div>
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



                    </div>
                </div>
            </div>
            <div>

            </div>
            <div className='resize_handle'>

            </div>
        </>
    );
}

export default LeftMenu;
