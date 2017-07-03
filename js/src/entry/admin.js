import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import store from '../store';
import AdminRouter from '../components/admin/navbar';

ReactDOM.render(
    <Provider store={store}>
        <AdminRouter />
    </Provider>,
    document.getElementById('geerydev-container')
);
