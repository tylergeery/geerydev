import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import ReduxThunk from 'redux-thunk';

import reducer from './reducers/index';

let store;

if (typeof GeeryDev !== 'undefined') {
    store = createStore(
        reducer,
        Object.assign({}, GeeryDev.state),
        applyMiddleware(logger, ReduxThunk)
    );
    delete GeeryDev.state;
} else {
    store = createStore(
        reducer,
        applyMiddleware(logger, ReduxThunk)
    );
}

export default store;
