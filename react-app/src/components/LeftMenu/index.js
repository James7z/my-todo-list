import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './LeftMenu.css';
import ProjectForm from '../ProjectForm';
import OpenModalButton from '../OpenModalButton';
import OpenModalMenuItem from '../OpenModalButton/OpenModalMenuItem';
import DeleteProjectModal from './DeleteProjectModal';


function LeftMenu() {

    const [openProjectList, setOpenProjectList] = useState(false);
    const sessionUser = useSelector(state => state.session.user);
    const projects = useSelector(state => state.project.UserProjects);
    const project = { project_name: '', color: '', view_type: '' }


    return (
        <>
            <div id="left-menu">
                <div>
                    <div data-expansion-panel-header="true" focus-marker-enabled-within>
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
                            {projects && projects.map((project, idx) => (
                                <>
                                    <div className='project-list-container'>
                                        <NavLink to={`/projects/${project.id}`} className="project-tasks-link">
                                            <div>
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
