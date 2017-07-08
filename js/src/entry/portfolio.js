import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import '../common/navComponents';
import store from '../store';
import projectActions from '../actions/project';
import GeeryDevProjectList from '../containers/GeeryDevProjectList';

ReactDOM.render(
    <Provider store={store}>
        <GeeryDevProjectList />
    </Provider>,
  document.getElementById('geerydev-projects')
);

store.dispatch(projectActions.getProjectList())
