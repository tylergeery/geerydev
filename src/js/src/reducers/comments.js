import actions from '../actions/constants';

let initialState = {
    list: [],
    postId: null
};

export default function users(state, action) {
    if (!state) {
        state = initialState;
    }

    let newState = Object.assign({}, state);

    switch (action.type) {
        case actions.commentsFetchComplete:
            newState.list = action.comments;

            return newState;
        case actions.commentsSetPostId:
            newState.postId = action.postId;

            return newState;
    }

    return state;
};
