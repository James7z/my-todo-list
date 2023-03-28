import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './LeftMenu.css';

function LeftMenu() {
    const sessionUser = useSelector(state => state.session.user);
    const projects = sessionUser.projects


    return (
        <>
            <div id="left-menu">
                <div>
                    <div data-expansion-panel-header="true" focus-marker-enabled-within>
                        <div>Project</div>
                        {projects && projects.map((project, idx) => (
                            <NavLink to={`/projects/${project.id}`}>
                                <div>
                                    {project.project_name}
                                </div>
                            </NavLink>

                        ))}


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
