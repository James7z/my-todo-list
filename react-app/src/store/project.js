// constants
const LOAD_SINGEL_PROJECT = "user/LOAD_SINGEL_PROJECT";
const LOAD_USER_PROJECTS = "user/LOADUSER_PROJECTS";
const DELETE_PROJECT = "project/DELETE_PROJECT"

const loadSingleProject = (project) => ({
    type: LOAD_SINGEL_PROJECT,
    payload: project
});

const loadUserProjects = (projects) => ({
    type: LOAD_USER_PROJECTS,
    payload: projects
});

const removeProject = (projectId) => ({
    type: DELETE_PROJECT,
    projectId
});

const initialState = { UserProjects: null, SingleProject: null };

export const getSingleProject = (projectId) => async (dispatch) => {
    const response = await fetch(`/api/projects/${projectId}`);
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }
        dispatch(loadSingleProject(data));
        return data
    }
};

export const getUserProjects = (user_id) => async (dispatch) => {
    const response = await fetch(`/api/users/${user_id}/projects`);
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }
        dispatch(loadUserProjects(data));
        return data
    }
};

export const createAUserProject = (user_id, projectObj) => async (dispatch) => {
    const { project_name, color, view_type } = projectObj
    const response = await fetch(`/api/users/${user_id}/projects`, {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify({
            project_name, color, view_type
        })
    });
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }
        dispatch(getUserProjects(user_id));
        return data
    }
};


export const updateAUserProject = (project_id, projectObj) => async (dispatch) => {
    const { project_name, color, view_type } = projectObj
    const response = await fetch(`/api/projects/${project_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify({
            project_name, color, view_type
        })
    });
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }
        dispatch(getUserProjects(data.user_id));
        return data
    }
};


export const deleteProject = (projectId, userId) => async (dispatch) => {
    const response = await fetch(`/api/projects/${projectId}`, {
        method: "DELETE",
    })
    if (response.ok) {
        dispatch(removeProject(projectId))
        return response
    }

}





export default function reducer(state = initialState, action) {
    let newState = { ...state }
    let UserProjects = { ...state.UserProjects }
    let SingleProject = { ...state.SingleProject }
    switch (action.type) {
        case LOAD_SINGEL_PROJECT:
            newState.SingleProject = action.payload
            return newState;

        case LOAD_USER_PROJECTS:
            newState.UserProjects = action.payload
            return newState;
        case DELETE_PROJECT:
            delete UserProjects[action.projectId];
            if (SingleProject && SingleProject.id === action.projectId) delete newState.SingleProject;
            return { ...newState, UserProjects, SingleProject: { id: 0 } }
        default:
            return state;
    }
}
