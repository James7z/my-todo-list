// constants
const LOAD_SINGEL_LABEL = "user/LOAD_SINGEL_LABEL";
const LOAD_USER_LABELS = "user/LOADUSER_LABELS";
const DELETE_LABEL = "label/DELETE_LABEL"

const loadSingleLabel = (label) => ({
    type: LOAD_SINGEL_LABEL,
    payload: label
});

const loadUserLabels = (labels) => ({
    type: LOAD_USER_LABELS,
    payload: labels
});

const removeLabel = (labelId) => ({
    type: DELETE_LABEL,
    labelId
});

const initialState = { UserLabels: null, SingleLabel: null }

export const getSingleLabel = (labelId) => async (dispatch) => {
    const response = await fetch(`/api/labels/${labelId}`);
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }
        dispatch(loadSingleLabel(data));
        return data
    }
};

export const getUserLabels = (user_id) => async (dispatch) => {
    const response = await fetch(`/api/users/${user_id}/labels`);
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }
        dispatch(loadUserLabels(data));
        return data
    }
};

export const createAUserLabel = (user_id, labelObj) => async (dispatch) => {
    const { label_name } = labelObj
    const response = await fetch(`/api/users/${user_id}/labels`, {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify({
            label_name
        })
    });
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }
        dispatch(getUserLabels(user_id));
        return data
    }
};


export const updateAUserLabel = (label_id, labelObj) => async (dispatch) => {
    const { label_name } = labelObj
    const response = await fetch(`/api/labels/${label_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify({
            label_name
        })
    });
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }
        dispatch(getUserLabels(data.user_id));
        return data
    }
};


export const deleteLabel = (labelId, userId) => async (dispatch) => {
    const response = await fetch(`/api/labels/${labelId}`, {
        method: "DELETE",
    })
    if (response.ok) {
        dispatch(removeLabel(labelId))
        return response
    }

}





export default function reducer(state = initialState, action) {
    let newState = { ...state }
    let UserLabels = { ...state.UserLabels }
    let SingleLabel = { ...state.SingleLabel }
    switch (action.type) {
        case LOAD_SINGEL_LABEL:
            newState.SingleLabel = action.payload
            return newState;

        case LOAD_USER_LABELS:
            newState.UserLabels = action.payload
            return newState;
        case DELETE_LABEL:
            delete UserLabels[action.labelId];
            if (SingleLabel && SingleLabel.id === action.labelId) delete newState.SingleLabel;
            return { ...newState, UserLabels, SingleLabel: { id: 0 } }
        default:
            return state;
    }
}
