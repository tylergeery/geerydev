import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';

import store from '../store';
import GeeryDevHeadBar from '../containers/GeeryDevHeadBar';
import GeeryDevNavBar from '../containers/GeeryDevNavBar';

hydrate(
    <Provider store={store}>
        <GeeryDevHeadBar />
    </Provider>,
  document.getElementById('geerydev-header')
);

hydrate(
    <Provider store={store}>
        <GeeryDevNavBar />
    </Provider>,
  document.getElementById('geerydev-navbar')
);
