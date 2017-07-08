import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import '../common/navComponents';
import store from '../store';
import postActions from '../actions/post';
import GeeryDevHomePanel from '../containers/GeeryDevHomePanel';
import GeeryDevPostList from '../containers/GeeryDevPostList';

ReactDOM.render(
    <Provider store={store}>
        <GeeryDevHomePanel />
    </Provider>,
  document.getElementById('geerydev-home-panel')
);

ReactDOM.render(
    <Provider store={store}>
        <GeeryDevPostList />
    </Provider>,
  document.getElementById('geerydev-posts')
);

store.dispatch(postActions.getPostList())
