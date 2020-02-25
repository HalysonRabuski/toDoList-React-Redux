import React, { useState, useRef, useEffect, Fragment } from 'react';
import { BrowserRouter as Router, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {storeList} from '../services/list/list'

import {
  Card,
  TextField,
  Button
} from '@material-ui/core'
import DateTimePicker from "@material-ui/pickers/DateTimePicker";

function New(props) {
    const didMountRef = useRef(false);
    const [title, setTitle] = useState('');
    const [date, setDate] = useState(new Date());
    const [description, setDescription] = useState('');

    function handleSubmit(e){
        e.preventDefault();
        // console.log(props.history)
        props.storeList(title, date, description)
        props.history.push('/')
        didMountRef.current = true
    }

    return (
        <Card style={{paddingBottom: '5%'}}>
            <h2 className='mb-5 text-center mt-4'>New Assignment</h2>
            <form onSubmit={(e)=>handleSubmit(e)} className="col-10 align-center offset-1">
            <TextField
              className='mb-3'
              variant="outlined"
              margin="normal"
              required
              onChange={(e)=>setTitle(e.target.value)}
              fullWidth
              id="title"
              label="Title"
              name="title"
              autoComplete="title"
              autoFocus
            />
            <TextField
                variant="outlined"
                className='mb-0'
                required
                id="datetime-local"
                fullWidth
                label="Date"
                type="datetime-local"
                InputLabelProps={{ shrink: true, required: true }}
                // defaultValue="dd/mm/aaaa --:--"
                className="col-12"
                onChange={(e)=>setDate(e.target.value)}
                // className={}
            />
            <TextField
              variant="outlined"
              className='mt-3'
              margin="normal"
              required
              onChange={(e)=>setDescription(e.target.value)}
              fullWidth
              id="description"
              label="Description"
              multiline={true}
              rowsMax={5}
              rows={4}
              name="description"
              autoComplete="description"
            />
              <Button
              type="submit"
            //   onClick={(e)=>{handleSubmit(e)}}
              fullWidth
              className='col-2 float-right mt-3'
              style={{padding: 10}}
              variant="contained"
              color="primary"
            //   className={classes.submit}
            >Create</Button>
            </form>
        </Card>
    );
}

const mapDispatchToProps = dispatch => bindActionCreators({
  storeList: (title, date, description) => storeList(title, date, description)
}, dispatch)

export default withRouter(connect(null, mapDispatchToProps)(New));