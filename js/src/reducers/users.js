import actions from '../actions/constants';

let initialState = {
    list: []
};

export default function users(state, action) {
    if (!state) {
        state = initialState;
    }

    let newState = Object.assign({}, state);

    switch (action.type) {
        case actions.usersFetchComplete:
            newState.list = action.users;

            return newState;
    }

    return state;
};
