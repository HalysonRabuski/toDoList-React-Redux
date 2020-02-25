import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { fetchSuccess } from '../redux/fetch/fetch.actions';

function Message({status}) {
    const [ isOpen, setIsOpen ] = useState(false);
    const [ message, setMessage ] = useState(false);

    useEffect(() => {
        if(status.message){
            setMessage(status.message)
            setIsOpen(true)
        }
    },[status.message]);

    return (
        <Snackbar  anchorOrigin={{ vertical: 'bottom',horizontal: 'right',}} open={isOpen} autoHideDuration={3000} onClose={()=>setIsOpen(false)}>
            <Alert severity={status.status} variant="filled">
                {message}
            </Alert>
        </Snackbar>
    )


}

const mapStateToProps = ({ fetch }) => ({
    status: fetch.status,
});

// const mapDispatchToProps = dispatch => bindActionCreators({
//     Attempt: (email, password) => Attempt(email, password)
// }, dispatch)

export default connect(mapStateToProps, null)(Message);