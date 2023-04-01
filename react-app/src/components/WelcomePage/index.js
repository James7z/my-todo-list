import React, { useState, useEffect, useRef } from "react";
import './WelcomePage.css';
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import bgLeft from './welcome-bg-center.png'

function WelcomePage({ isLoaded }) {
    const sessionUser = useSelector((state) => state.session.user);
    const bgImgUrl = "https://img.freepik.com/free-vector/businessman-holding-pencil-big-complete-checklist-with-tick-marks_1150-35019.jpg?w=1380&t=st=1680306232~exp=1680306832~hmac=c01021f30f4d9758a4a0f34415cff430bdfc243c36f9cf7701e2b82709f1bba1"
    if (sessionUser) return <Redirect to="/home" />;



    return (
        <>
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

        </>
    );
}

export default WelcomePage;
