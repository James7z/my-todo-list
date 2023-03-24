import React, { useState, useEffect, useRef } from "react";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import './Navigation.css';
import LogoutModal from "../LogoutModal";

function ProfileButton({ user }) {

  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current?.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const unfinishedAlert = () => {
    window.alert("Sorry, this feature is not functional.")
  }

  const showFeatureMessage = () => alert("Feature Coming Soon")

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      {user ? (
        <div id='navbar-right-logged-in'>
          <button id='user-menu-button' onClick={openMenu}>
            <i className="fa-solid fa-user fa-xl" />
          </button>
          <div id='user-menu-options' className={ulClassName} ref={ulRef}>
            <div className="user-menu-header user-menu-section top">
              <div>Account</div>
              <OpenModalButton
                id='logout-button'
                buttonText={"Log out"}
                modalComponent={<LogoutModal />}
              />
            </div>
            <div id="user-information-section" className="user-menu-section"
              onClick={() => showFeatureMessage()}
            >
              <div id='user-username'>{user?.username}</div>
            </div>
          </div>
        </div>
      ) : (
        <div id="session-options">
          <OpenModalButton
            buttonText="Log In"
            onItemClick={closeMenu}
            modalComponent={<LoginFormModal />}
            id='login-button'
            className='test1'
          />

          <OpenModalButton
            buttonText="Sign Up"
            onItemClick={closeMenu}
            modalComponent={<SignupFormModal />}
          />
        </div>
      )}
    </>
  );
}

export default ProfileButton;
