import 'whatwg-fetch';
import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';

import '../common/navComponents';
import store from '../store';
import GeeryDevProjectList from '../containers/GeeryDevProjectList';

hydrate(
    <Provider store={store}>
        <GeeryDevProjectList />
    </Provider>,
  document.getElementById('geerydev-projects')
);
