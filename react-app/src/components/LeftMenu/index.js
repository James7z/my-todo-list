import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './LeftMenu.css';
import ProjectForm from '../ProjectForm';
import OpenModalButton from '../OpenModalButton';
import ProjectActionMenu from './ProjectActionMenu';

function LeftMenu() {

    const sessionUser = useSelector(state => state.session.user);
    const projects = useSelector(state => state.project.UserProjects);
    const project = { project_name: '', color: '', view_type: '' }


    return (
        <>
            <div id="left-menu">
                <div>
                    <div data-expansion-panel-header="true" focus-marker-enabled-within>
                        <div>Project</div>
                        {projects && projects.map((project, idx) => (
                            <>
                                <div className='project-list-container'>
                                    <NavLink to={`/projects/${project.id}`} className="project-tasks-link">
                                        <div>
                                            {project.project_name}
                                        </div>
                                    </NavLink>
                                    <span  >
                                        <ProjectActionMenu project={project} userId={sessionUser.id} />
                                    </span>
                                </div>

                            </>
                        ))}

                        <div>
                            <OpenModalButton
                                buttonText="Add Project"
                                modalComponent={<ProjectForm userId={sessionUser.id} project={project} formType="Create a New Project" />}
                            />

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
