import actions from '../actions/constants';

let initialState = {
    error: null,
    explain: true,
    query: '',
    summary: {
        winner: null,
        explanation: null
    }
};

export default function classifier(state, action) {
    if (!state) {
        state = initialState;
    }

    let newState = Object.assign({}, state);

    switch (action.type) {
        case actions.classifierFetchComplete:
            newState.explain = false;
            newState.summary.winner = action.winner;
            newState.summary.explanation = ''; //TODO get funny quips

            return newState;
        case actions.classifierFetchError:
            newState.error = action.error;
            newState.explain = true;
            newState.summary = initialState.summary;

            return newState;
    }

    return state;
};
