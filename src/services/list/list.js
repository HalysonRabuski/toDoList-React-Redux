import axios from 'axios';
import { setCurrentlist, setlists } from '../../redux/lists/list.actions';
import { fetchStart, fetchSuccess, fetchError, fetchMessage } from '../../redux/fetch/fetch.actions';
import api from '../api'

export const getLists = (email, password) => {
    return dispatch => {
        dispatch(fetchStart('start'));
        api.get('/lists', {headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }})
            .then(res => {
            dispatch(fetchSuccess({status: 'success'}));
            console.log(res)
            dispatch(setlists(res.data))
        })
        .catch(err => {
            console.log(err)
            // dispatch(fetchMessage(err.response.data.error))
            dispatch(fetchError({status: 'error', message: 'lists not found 8('}));
        });
    };
};

export const getToday = (email, password) => {
    return dispatch => {
        dispatch(fetchStart('start'));
        api.get('/lists/today', {headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }})
            .then(res => {
            dispatch(fetchSuccess({status: 'success', message: ''}));
            dispatch(setlists(res.data))
        })
        .catch(err => {
            console.log(err)
            // dispatch(fetchMessage(err.response.data.error))
            dispatch(fetchError({status: 'error', message: 'lists not found 8('}));
        });
    };
};

export const storeList = (title, date, description) => {
    return dispatch => {
        dispatch(fetchStart('start'));
        api.post('/lists',{title: title,date: date,description: description} ,{headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }}) 
        .then(res => {
            dispatch(fetchSuccess({status: 'success', message: 'Assignment has been registered successfully'}));
        })
        .catch(err => {
            // console.log(err)
            // dispatch(fetchMessage(err.response.data.error))
            console.log(localStorage.getItem('token'))
            dispatch(fetchError({status: 'error', message: 'Error registering assignment, please try again'}));
        });
    };
};

export const deleteAssignment = (id) => {
    return dispatch => {
        dispatch(fetchStart('start'));
        api.delete(`/lists/${id}`,{headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }}) 
        .then(res => {
            dispatch(fetchSuccess({status: 'success', message: 'Assignment has been deleted successfully'}));
            
        })
        .catch(err => {
            // console.log(err)
            // dispatch(fetchMessage(err.response.data.error))
            console.log(localStorage.getItem('token'))
            dispatch(fetchError({status: 'error', message: 'Error deleting assignment, please try again'}));
        });
    };
};

export const doAssignment = (id) => {
    return dispatch => {
        dispatch(fetchStart('start'));
        api.put(`/lists/${id}`,{done: true},{headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }}) 
        .then(res => {
            dispatch(fetchSuccess({status: 'success', message: 'Assignment has been successfully marked as done'}));
        })
        .catch(err => {
            // console.log(err)
            // dispatch(fetchMessage(err.response.data.error))
            console.log(err)
            dispatch(fetchError({status: 'error', message: 'Error marking assignment as done, please try again'}));
        });
    };
};

export const getDone = () => {
    return dispatch => {
        dispatch(fetchStart('start'));
        api.get(`/lists/done`,{headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }}) 
        .then(res => {
            dispatch(fetchSuccess({status: 'success'}));
            dispatch(setlists(res.data))
        })
        .catch(err => {
            // console.log(err)
            // dispatch(fetchMessage(err.response.data.error))
            console.log(err)
            dispatch(fetchError({status: 'error', message: 'Error getting done assignments, please try again'}));
        });
    };
};