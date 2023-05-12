// constants
const LOAD_TASKS = "tasks/LOAD_TASKS";
const ADD_SINGLE_TASK = "tasks/ADD_SINGEL_TASK"
const DELETE_SINGLE_TASK = "tasks/DELETE_SINGLE_TASK"


const loadTasks = (tasks) => ({
    type: LOAD_TASKS,
    payload: tasks,
});

const addSingleTask = (task) => ({
    type: ADD_SINGLE_TASK,
    payload: task
})

const deleteSingleTask = (taskId) => ({
    type: DELETE_SINGLE_TASK,
    taskId
})


export const getUserTasks = (userId) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}/tasks`);
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }
        dispatch(loadTasks(data));
        return data
    }
};

export const getProjectTask = (projectId) => async (dispatch) => {
    const response = await fetch(`/api/projects/${projectId}/tasks`);
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }
        dispatch(loadTasks(data));
        return data
    }
};

export const getLabelTask = (labelId) => async (dispatch) => {
    const response = await fetch(`/api/labels/${labelId}/tasks`);
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }
        dispatch(loadTasks(data));
        return data
    }
};



export const createAUserTask = (user_id, taskObj) => async (dispatch) => {
    const { task_name, description, priority, due_date, project_id, label_ids } = taskObj
    const response = await fetch(`/api/users/${user_id}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify({
            task_name, description, priority, due_date, project_id, label_ids
        })
    });
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }
        dispatch(addSingleTask(data));
        return data
    }
};

export const updateATask = (task_id, taskObj) => async (dispatch) => {
    const { task_name, description, priority, due_date, project_id, label_ids } = taskObj
    const response = await fetch(`/api/tasks/${task_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify({
            task_name, description, priority, due_date, project_id, label_ids
        })
    });
    if (response.ok) {
        const data = await response.json();
        // console.log(data)
        if (data.errors) {
            return;
        }
        // dispatch(updateSingleTask(data));
        dispatch(addSingleTask(data));
        return data
    }
};


export const checkATask = (task_id) => async (dispatch) => {
    const response = await fetch(`/api/tasks/check/${task_id}`, {
        method: "PUT",

    });
    if (response.ok) {
        const data = await response.json();
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
        dispatch(deleteSingleTask(taskId))
        return response
    }

}


export const createATaskComment = (task_id, commentObj) => async (dispatch) => {
    const { comment, image_url, user_id } = commentObj
    const response = await fetch(`/api/tasks/${task_id}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify({
            comment, image_url, user_id
        })
    });
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }
        dispatch(getUserTasks(user_id));
        return data
    }
};


export const updateAComment = (comment_id, commentObj) => async (dispatch) => {
    const { comment, image_url, user_id } = commentObj
    const response = await fetch(`/api/comments/${comment_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify({
            comment, image_url, user_id
        })
    });
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }
        dispatch(getUserTasks(user_id));
        return data
    }
};


export const deleteComment = (commentId, user_id) => async (dispatch) => {

    const response = await fetch(`/api/comments/${commentId}`, {
        method: "DELETE",
    })
    if (response.ok) {
        dispatch(getUserTasks(user_id));
        return response
    }

}

// const initialState = { userTasks: null, projectTasks: null };
const initialState = { AllTasks: null };

export default function reducer(state = initialState, action) {
    let newState = { ...state }
    let AllTasks = {}
    switch (action.type) {
        case LOAD_TASKS:
            newState.AllTasks = action.payload
            return newState;
        case ADD_SINGLE_TASK:
            AllTasks = { ...state.AllTasks, [action.payload.id]: action.payload }
            return { ...state, AllTasks };
        case DELETE_SINGLE_TASK:
            AllTasks = { ...state.AllTasks }
            delete AllTasks[action.taskId];
            return { ...state, AllTasks };
        default:
            return state;
    }
}
