import actions from '../actions/constants';

let initialState = {
    error: null,
    explain: true,
    query: '',
    results: [],
    searching: false,
    resultsActive: false
};

export default function classifier(state, action) {
    if (!state) {
        state = initialState;
    }

    let newState = Object.assign({}, state);

    switch (action.type) {
        case actions.classifierFetchActive:
            newState.searching = true;

            return newState;
        case actions.classifierFetchComplete:
            newState.explain = false;
            newState.results.unshift(action.result);
            newState.results = newState.results.slice(0, 50);
            newState.resultsActive = false;

            return newState;
        case actions.classifierFetchError:
            newState.error = action.error;
            newState.explain = true;
            newState.searching = false;

            return newState;
        case actions.classifierResultsActive:
            newState.resultsActive = true;
            newState.searching = false;

            return newState;
    }

    return state;
};
