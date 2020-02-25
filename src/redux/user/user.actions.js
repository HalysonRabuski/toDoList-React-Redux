import { userActionTypes } from './user.types';

export const setCurrentUser = user => ({
    type: userActionTypes.SET_CURRENT_USER,
    payload: user
});

export const setUsers= users => ({
    type: userActionTypes.SET_USERS,
    payload: users
});

export const logoff = () => ({
    type: userActionTypes.LOGOFF
});