import { userActionTypes } from './user.types';

const INITIAL_STATE = {
    users: [],
    user: {},    
    token: localStorage.getItem('token')
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case userActionTypes.SET_CURRENT_USER:
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token
            };
        case userActionTypes.SET_USERS:
            return {
                ...state,
                users: action.payload
            };
        case userActionTypes.LOGOFF:
            return {
                ...state
            };
        default:
            return state;
    }
};

export default userReducer;