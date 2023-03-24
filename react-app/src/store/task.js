// constants
const LOAD_USER_TASKS = "user/LOAD_USER_TASKS";


const loadUserTasks = (tasks) => ({
    type: LOAD_USER_TASKS,
    payload: tasks,
});


const initialState = { userTasks: null };

export const getUsersTasks = (userId) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}/tasks`);
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }
        dispatch(loadUserTasks(data));
        return data
    }
};


export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_USER_TASKS:
            return { userTasks: action.payload };
        default:
            return state;
    }
}
