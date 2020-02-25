import axios from 'axios';
import { setUsers, setCurrentUser } from '../../redux/user/user.actions';
import { fetchStart, fetchSuccess, fetchError, fetchMessage } from '../../redux/fetch/fetch.actions';
import api from '../api'

export const getUsers = () => {
    return dispatch => {
        dispatch(fetchStart('start'));
        api.get('http://192.168.0.241:8000/users/', { 
            headers: { auth: localStorage.getItem('token') }
        })
        .then(res => {
            dispatch(fetchMessage())
            dispatch(fetchSuccess('success'));
            dispatch(setUsers(res.data));
        })
        .catch(err => {
            localStorage.removeItem('token')
            dispatch(setCurrentUser({
                user: null,
                token: null
            }));
            dispatch(fetchMessage())
            dispatch(fetchError('error'));
        });
    };
};

export const getUser = userId => {
    return dispatch => {
        dispatch(fetchStart('start'));
        axios
        .get(`http://192.168.0.241:8000/users/${userId}`, {
            headers: { auth: localStorage.getItem('token') }
        })
        .then(res => {
            dispatch(fetchSuccess('success'));
            dispatch(fetchMessage())
            dispatch(setCurrentUser({
                user: res.data
            }))
        })
        .catch(err => {
            dispatch(fetchError('error'));
            dispatch(fetchMessage(err.response.data.error))
        });
    };
};

export const registerUser = user => {
    return dispatch => {
        dispatch(fetchStart('start'));
        axios
        .post('http://192.168.0.241:8000/users/', user,{
            headers: { auth: localStorage.getItem('token') }
        })
        .then(res => {
            dispatch(fetchSuccess('success'));
            dispatch(fetchMessage('Usuário cadastrado com sucesso'))
            dispatch(setCurrentUser({
                users: res.data
            }))
        })
        .catch(err => {
            dispatch(fetchError('error'));
            dispatch(fetchMessage(err.response.data.error))
        });
    };
};

export const updateUser = user => {
    return dispatch => {
        dispatch(fetchStart('start'));        
        axios
        .put(`http://192.168.0.241:8000/users/${user.id}`, user, {
            headers: { auth: localStorage.getItem('token') }
        })
        .then(res => {
            dispatch(fetchSuccess('success'));
            dispatch(fetchMessage('Usuário atualizado com sucesso'))
            dispatch(setCurrentUser({
                users: res.data
            }))
        })
        .catch(err => {
            dispatch(fetchError('error'));
            dispatch(fetchMessage(err.response.data.error))
        });
    };
};

export const deleteUser = userId => {
    return dispatch => {
        dispatch(fetchStart('start'));
        axios
        .delete(`http://192.168.0.241:8000/users/${userId}`,{
            headers: { auth: localStorage.getItem('token') }
        })
        .then(res => {
            dispatch(fetchSuccess('success'));
            dispatch(fetchMessage('Usuário bloqueado com sucesso'))
            dispatch(setCurrentUser({
                users: res.data
            }))
        })
        .catch(err => {
            dispatch(fetchError('error'));
            dispatch(fetchMessage(err.response.data.error))
        });
    };
};