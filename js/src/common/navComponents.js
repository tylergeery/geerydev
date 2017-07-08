import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import store from '../store';
import GeeryDevHeadBar from '../containers/GeeryDevHeadBar';
import GeeryDevNavBar from '../containers/GeeryDevNavBar';
import headbarActions from '../actions/headbar';

ReactDOM.render(
    <Provider store={store}>
        <GeeryDevHeadBar />
    </Provider>,
  document.getElementById('geerydev-header')
);

ReactDOM.render(
    <Provider store={store}>
        <GeeryDevNavBar />
    </Provider>,
  document.getElementById('geerydev-navbar')
);

setInterval(function() {
    store.dispatch(headbarActions.incrementQuote());
}, 5000);
