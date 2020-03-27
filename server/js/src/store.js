import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import ReduxThunk from 'redux-thunk';

import reducer from './reducers/index';

let store;

if (typeof GeeryDev !== 'undefined') {
    // on the client
    store = createStore(
        reducer,
        Object.assign({}, GeeryDev.state),
        applyMiddleware(logger, ReduxThunk)
    );
    delete GeeryDev.state;
} else {
    // on the server
    store = createStore(
        reducer,
        applyMiddleware(ReduxThunk)
    );
}

export default store;
