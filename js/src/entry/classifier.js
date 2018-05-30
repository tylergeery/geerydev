import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import '../common/navComponents';
import store from '../store';
import GeeryDevClassifier from '../containers/GeeryDevClassifier';

ReactDOM.hydrate(
    <Provider store={store}>
        <GeeryDevClassifier />
    </Provider>,
    document.getElementById('geerydev-classifier')
);
