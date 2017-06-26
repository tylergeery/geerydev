import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import '../common/navComponents';
import store from '../store';
import GeeryDevHomePanel from '../containers/GeeryDevHomePanel';

ReactDOM.render(
    <Provider store={store}>
        <GeeryDevHomePanel />
    </Provider>,
  document.getElementById('geerydev-home-panel')
);
