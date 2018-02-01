import actions from '../actions/constants';

let initialState = {
    list: []
};

export default function subscribers(state, action) {
    switch (action.type) {
        case actions.subscribersFetchComplete:
            newState.list = action.list;

            return newState;
    }

    return state;
};
