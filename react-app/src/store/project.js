// constants
const LOAD_SINGEL_PROJECT = "user/LOAD_SINGEL_PROJECT";


const loadSingleProject = (project) => ({
    type: LOAD_SINGEL_PROJECT,
    payload: project
});


const initialState = { AllProjects: null, SingleProject: null };

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




export default function reducer(state = initialState, action) {
    let newState = { ...state }
    switch (action.type) {
        case LOAD_SINGEL_PROJECT:
            newState.SingleProject = action.payload
            return newState;
        // case UPDATE_SINGLE_TASK:
        //     newState.userTasks[action.payload.id] = action.payload
        //     return newState
        default:
            return state;
    }
}
