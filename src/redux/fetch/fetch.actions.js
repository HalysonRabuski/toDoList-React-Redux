import { fetchActionTypes } from './fetch.types';

export const fetchStart = status => ({
    type: fetchActionTypes.FETCH_START,
    payload: status
});

export const fetchSuccess = status => ({
    type: fetchActionTypes.FETCH_SUCCESS,
    payload: status
});

export const fetchError = status => ({
    type: fetchActionTypes.FETCH_ERROR,
    payload: status
});