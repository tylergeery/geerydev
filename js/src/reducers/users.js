import actions from '../actions/constants';

let initialState = {
    list: []
};

export default function users(state, action) {
    switch (action.type) {
        case actions.usersFetchComplete:
            newState.list = action.users;

            return newState;
    }

    return state;
};
