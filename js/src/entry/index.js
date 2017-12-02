import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import '../common/navComponents';
import store from '../store';
import postActions from '../actions/post';
import GeeryDevHomePanel from '../containers/GeeryDevHomePanel';
import GeeryDevPostList from '../containers/GeeryDevPostList';
import url from '../utils/url';

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

const params = url.getParams();
const perPage = +params.per_page || 10;
const page = +params.page || 1;

store.dispatch(postActions.getPostList('', '', page, perPage));
