import actions from '../actions/constants';

let initialState = {
    list: [],
    searchResults: [],
    sidePanelPosts: []
};

export default function posts(state, action) {
    if (!state) {
        state = initialState;
    }

    let newState = Object.assign({}, state);

    switch (action.type) {
        case actions.postsFetchSearchResults:
            newState.searchResults = action.searchResults;

            return newState;
        case actions.postsFetch:
            newState.list = action.posts;

            return newState;
        case actions.postsFetchSidePanel:
            newState.sidePanelPosts = action.posts;

            return newState;
    }

    return state;
};
