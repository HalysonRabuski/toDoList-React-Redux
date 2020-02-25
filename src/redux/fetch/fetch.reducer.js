import { fetchActionTypes } from './fetch.types';

const INITIAL_STATE = {
    status: {}
};

const fetchReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case fetchActionTypes.FETCH_START:
            return {
                ...state,
                status: action.payload,
            };
        case fetchActionTypes.FETCH_SUCCESS:
            return {
                ...state,
                status: action.payload,
            };
        case fetchActionTypes.FETCH_ERROR:
            return {
                ...state,
                status: action.payload,
            };
        case fetchActionTypes.SET_MESSAGE:
        return {
            ...state,
            message: action.payload,
        };
        default:
            return state;
    }
};

export default fetchReducer;