import actions from '../actions/constants';

let initialState = {
    error: null,
    explain: true,
    query: '',
    quip: null
};

export default function classifier(state, action) {
    if (!state) {
        state = initialState;
    }

    let newState = Object.assign({}, state);

    switch (action.type) {
        case actions.classifierFetchComplete:
            newState.explain = false;
            newState.quip = action.quip;

            return newState;
        case actions.classifierFetchError:
            newState.error = action.error;
            newState.explain = true;
            newState.quip = initialState.quip;

            return newState;
    }

    return state;
};
