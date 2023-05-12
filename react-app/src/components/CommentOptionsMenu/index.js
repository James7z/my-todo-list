import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { deleteComment } from "../../store/task";
import DeleteCommentModal from "./DeleteCommentModal";
import OpenModalButton from "../OpenModalButton";
import './CommentOptionsMenu.css'

const CommentOptionsMenu = ({ commentId }) => {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

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

    const openMenu = () => {

        if (showMenu) return;
        setShowMenu(!showMenu);
    }

    // const handleReplyComment = async (e) => {
    //     console.log("Reply to comment button is working!")
    // }

    // const closeMenu = () => setShowMenu(false);

    return (
        <>
            <div className={`origional-commenter-options-menu ${!showMenu && "hidden"}`}>
                <OpenModalButton
                    className={`origional-commenter-options-menu-section comment-option-delete-button ${!showMenu && "hidden"}`}
                    buttonText="Delete comment"
                    modalComponent={<DeleteCommentModal commentId={commentId} />}
                />
                <div className={`origional-commenter-options-menu-section comment-option-cancel-button ${!showMenu && "hidden"}`}
                    onClick={() => setShowMenu(false)}>Close</div>
            </div>
            <i className="fa-solid fa-ellipsis open-commenter-options-button" onClick={openMenu} />
        </>
    )
}

export default CommentOptionsMenu
