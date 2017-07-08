import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger'
import ReduxThunk from 'redux-thunk';

import reducer from './reducers/index';

const store = createStore(
    reducer,
    applyMiddleware(logger, ReduxThunk)
);

export default store
