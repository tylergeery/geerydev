import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import '../common/navComponents';
import '../common/panelSpy';
import store from '../store';
import postActions from '../actions/post';
import GeeryDevSidePanel from '../containers/GeeryDevSidePanel';

ReactDOM.render(
    <Provider store={store}>
        <GeeryDevSidePanel />
    </Provider>,
  document.getElementById('geerydev-side-panel')
);

store.dispatch(postActions.getSideBarPosts());
