import axios from 'axios';
import { setCurrentUser, logoff } from '../../redux/user/user.actions';
import { fetchStart, fetchSuccess, fetchError, fetchMessage } from '../../redux/fetch/fetch.actions';
import api from '../api'

export const Attempt = (email, password) => {
    return dispatch => {
        dispatch(fetchStart('start'));
        api.post('/authenticate', { email: email, password: password })
            .then(res => {
            dispatch(fetchSuccess({status: 'success', message: ''}));
            localStorage.setItem('token', (res.data.token))
            dispatch(setCurrentUser({
                user: "",
                token: res.data.token
            }));
        })
        .catch(err => {
            // dispatch(setMessage("teste"))
            console.log(err)
            // dispatch(fetchMessage(err.response.data.error))
            dispatch(fetchError({status: 'error', message: 'User and password does not match'}));
        });
    };
};

export const Logout = () => {
    return dispatch => {
        localStorage.removeItem('token');
        dispatch(setCurrentUser({
            user: {},
            token: null
        }))
        dispatch(logoff());
        dispatch(fetchSuccess({
            status: 'info',
            message: 'You have been logged out'
        }))
    };
};

export const Register = (username, email, password) => {
    return dispatch => {
        dispatch(fetchStart('start'));
        api.post('/register', { username: username, email: email, password: password })
            .then(res => {
            dispatch(fetchSuccess({status: 'success', message: 'User successfully registered'}));
        })
        .catch(err => {
            // dispatch(setMessage("teste"))
            console.log(err)
            // dispatch(fetchMessage(err.response.data.error))
            dispatch(fetchError({status: 'error', message: 'Oops an error occoured while registering user, please try again'}));
        });
    };
};