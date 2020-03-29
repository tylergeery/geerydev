import actions from '../actions/constants';

let initialState = [];

export default function projects(state, action) {
    if (!state) {
        state = initialState;
    }

    let newState = Object.assign({}, state);

    switch (action.type) {
        case actions.projectFetch:
            return action.projects;
    }

    return state;
};
