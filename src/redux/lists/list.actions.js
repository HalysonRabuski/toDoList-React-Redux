import { listActionTypes } from './list.types';

export const setCurrentlist = list => ({
    type: listActionTypes.SET_CURRENT_LIST,
    payload: list
});

export const setlists= lists => ({
    type: listActionTypes.SET_LISTS,
    payload: lists
});

export const logoff = () => ({
    type: listActionTypes.LOGOFF
});