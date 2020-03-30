import actions from '../actions/constants';

let initialState = {
    list: []
};

export default function subscribers(state, action) {
    if (!state) {
        state = initialState;
    }

    let newState = Object.assign({}, state);

    switch (action.type) {
        case actions.subscribersFetchComplete:
            newState.list = action.subscribers;

            return newState;
    }

    return state;
};
