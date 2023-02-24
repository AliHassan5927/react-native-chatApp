import {applyMiddleware, createStore} from 'redux';
import ReduxThunk from 'redux-thunk';
import Reducers from './reducers/index';

const store = createStore(Reducers, {}, applyMiddleware(ReduxThunk));
export default store;
