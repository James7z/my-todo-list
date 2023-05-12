// constants
const LOAD_SINGEL_COMMENT = "task/LOAD_SINGEL_COMMENT";
const LOAD_TASK_COMMENTS = "task/LOADTASK_COMMENTS";
const DELETE_COMMENT = "comment/DELETE_COMMENT"

const loadSingleComment = (comment) => ({
    type: LOAD_SINGEL_COMMENT,
    payload: comment
});

const loadTaskComments = (comments) => ({
    type: LOAD_TASK_COMMENTS,
    payload: comments
});

const removeComment = (commentId) => ({
    type: DELETE_COMMENT,
    commentId
});

const initialState = { TaskComments: null, SingleComment: null }

export const getSingleComment = (commentId) => async (dispatch) => {
    const response = await fetch(`/api/comments/${commentId}`);
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }
        dispatch(loadSingleComment(data));
        return data
    }
};

export const getTaskComments = (task_id) => async (dispatch) => {
    const response = await fetch(`/api/tasks/${task_id}/comments`);
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }
        dispatch(loadTaskComments(data));
        return data
    }
};













export default function reducer(state = initialState, action) {
    let newState = { ...state }
    let TaskComments = { ...state.TaskComments }
    let SingleComment = { ...state.SingleComment }
    switch (action.type) {
        case LOAD_SINGEL_COMMENT:
            newState.SingleComment = action.payload
            return newState;

        case LOAD_TASK_COMMENTS:
            newState.TaskComments = action.payload
            return newState;
        case DELETE_COMMENT:
            delete TaskComments[action.commentId];
            if (SingleComment && SingleComment.id === action.commentId) delete newState.SingleComment;
            return { ...newState, TaskComments, SingleComment: { id: 0 } }
        default:
            return state;
    }
}
