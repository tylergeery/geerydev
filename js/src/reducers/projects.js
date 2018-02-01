import actions from '../actions/constants';

let initialState = [];

export default function projects(state, action) {
    switch (action.type) {
        case actions.projectFetch:
            return action.projects;
    }

    return state;
};
