import { listActionTypes } from './list.types';

const INITIAL_STATE = {
    lists: [],
    list: {},    
};

const listReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case listActionTypes.SET_CURRENT_LIST:
            return {
                ...state,
                list: action.payload.list,
                token: action.payload.token
            };
        case listActionTypes.SET_LISTS:
            return {
                ...state,
                lists: action.payload
            };
        case listActionTypes.LOGOFF:
            return {
                ...state
            };
        default:
            return state;
    }
};

export default listReducer;