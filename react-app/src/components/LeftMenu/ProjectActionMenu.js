import React, { useState } from 'react';
import './LeftMenu.css';
import OpenModalMenuItem from '../OpenModalButton/OpenModalMenuItem';
import ProjectForm from '../ProjectForm';
import DeleteProjectModal from './DeleteProjectModal';

export default function ProjectActionMenu({ project, userId }) {
    const [openProjectMenu, setOpenProjectMenu] = useState(false);
    return (
        <>
            <span className='project-action-menu-span'>
                <i className="fa-solid fa-ellipsis" onClick={() => setOpenProjectMenu(!openProjectMenu)}></i>
                <div className={`project-action-menu-container ${openProjectMenu ? "show" : "hidden"}`} >
                    <ul className='project-action-menu-list'>
                        <OpenModalMenuItem
                            onItemClick={() => setOpenProjectMenu(false)}
                            itemText={<><i className="fa-regular fa-pen-to-square">  </i> Edit project </>}
                            modalComponent={<ProjectForm project={project} userId={userId} formType="Update a Project" />} />
                        <OpenModalMenuItem
                            onItemClick={() => setOpenProjectMenu(false)}
                            itemText={<><i className="fa-solid fa-trash-can">  </i> Delete project </>}
                            modalComponent={<DeleteProjectModal projectId={project.id} userId={userId} />} />
                    </ul>
                </div>

            </span>
        </>
    )
}
