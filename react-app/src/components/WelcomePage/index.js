import React, { useState, useEffect, useRef } from "react";
import './WelcomePage.css';
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function WelcomePage({ isLoaded }) {
    const sessionUser = useSelector((state) => state.session.user);
    if (sessionUser) return <Redirect to="/home" />;



    return (
        <>
            <div className="welcome-page">
                <div className='welcome-message'>
                    <h1>
                        Welcome to MyTodoList
                        <br></br>
                        Become organized and focused.
                    </h1>
                </div>
                <div className="welcome-page-signup-button">
                    <OpenModalButton
                        buttonText="Start for free"
                        modalComponent={<SignupFormModal />}
                    />
                </div>
            </div>

        </>
    );
}

export default WelcomePage;
