import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import '../common/navComponents';
import store from '../store';
import GeeryDevSudoku from '../containers/GeeryDevSudoku';

ReactDOM.render(
    <Provider store={store}>
        <GeeryDevSudoku />
    </Provider>,
  document.getElementById('geerydev-sudoku-solver')
);
