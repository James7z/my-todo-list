// constants
const LOAD_USER_TASKS = "user/LOAD_USER_TASKS";
const UPDATE_SINGLE_TASK = "tasks/UPDATE_SINGLE_TASK"

const loadUserTasks = (tasks) => ({
    type: LOAD_USER_TASKS,
    payload: tasks,
});

const updateSingleTask = (task) => ({
    type: UPDATE_SINGLE_TASK,
    payload: task
})

const initialState = { userTasks: null };

export const getUserTasks = (userId) => async (dispatch) => {
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

export const createAUserTask = (user_id, taskObj) => async (dispatch) => {
    const { task_name, description, priority, due_date } = taskObj
    const response = await fetch(`/api/users/${user_id}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify({
            task_name, description, priority, due_date
        })
    });
    if (response.ok) {
        const data = await response.json();
        // console.log(data)
        if (data.errors) {
            return;
        }
        dispatch(getUserTasks(user_id));
        return data
    }
};

export const updateATask = (task_id, taskObj) => async (dispatch) => {
    const { task_name, description, priority, due_date } = taskObj
    const response = await fetch(`/api/tasks/${task_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify({
            task_name, description, priority, due_date
        })
    });
    if (response.ok) {
        const data = await response.json();
        // console.log(data)
        if (data.errors) {
            return;
        }
        // dispatch(updateSingleTask(data));
        dispatch(getUserTasks(data.user_id));
        return data
    }
};



export const deleteTask = (taskId, userId) => async (dispatch) => {
    const response = await fetch(`/api/tasks/${taskId}`, {
        method: "DELETE",
    })
    if (response.ok) {
        dispatch(getUserTasks(userId))
        return response
    }

}



export default function reducer(state = initialState, action) {
    let newState = { ...state }
    switch (action.type) {
        case LOAD_USER_TASKS:
            return { userTasks: action.payload };
        case UPDATE_SINGLE_TASK:
            newState.userTasks[action.payload.id] = action.payload
            return newState
        default:
            return state;
    }
}
