import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './LeftMenu.css';

function LeftMenu() {
    const sessionUser = useSelector(state => state.session.user);
    // const projects =

    return (
        <>
            <div id="left-menu">
                <div>
                    <div data-expansion-panel-header="true" focus-marker-enabled-within>
                        Project
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
