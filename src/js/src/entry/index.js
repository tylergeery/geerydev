import 'whatwg-fetch';
import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';

import '../common/navComponents';
import store from '../store';
import GeeryDevHomePanel from '../containers/GeeryDevHomePanel';
import GeeryDevPostList from '../containers/GeeryDevPostList';

hydrate(
    <Provider store={store}>
        <GeeryDevHomePanel />
    </Provider>,
  document.getElementById('geerydev-home-panel')
);

hydrate(
    <Provider store={store}>
        <GeeryDevPostList />
    </Provider>,
  document.getElementById('geerydev-posts')
);
