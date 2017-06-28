import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import '../common/navComponents';
import '../common/panelSpy';
import store from '../store';
import postActions from '../actions/post';
import commentActions from '../actions/comment';
import GeeryDevSidePanel from '../containers/GeeryDevSidePanel';
import GeeryDevCommentSection from '../containers/GeeryDevCommentSection';
import GeeryDevCommentList from '../containers/GeeryDevCommentList';

ReactDOM.render(
    <Provider store={store}>
        <GeeryDevSidePanel />
    </Provider>,
    document.getElementById('geerydev-side-panel')
);

ReactDOM.render(
    <Provider store={store}>
        <GeeryDevCommentSection />
    </Provider>,
    document.getElementById('geerydev-comments')
)

ReactDOM.render(
    <Provider store={store}>
        <GeeryDevCommentList />
    </Provider>,
    document.getElementById('geerydev-comment-list')
)

store.dispatch(postActions.getSideBarPosts())
store.dispatch(postActions.setBlogId(window.GeeryDev.blogId))
store.dispatch(commentActions.getComments(window.GeeryDev.blogId))
