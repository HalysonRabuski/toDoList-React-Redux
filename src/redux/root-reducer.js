import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import fetchReducer from './fetch/fetch.reducer';
import listReducer from './lists/list.reducer'

export default combineReducers({
    list: listReducer,
    user: userReducer,
    fetch: fetchReducer,
});