import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect, withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {getLists, deleteAssignment, doAssignment} from '../services/list/list'
import List from '../components/List'


import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

function Home(props) {
    const didMountRef = useRef(false);
    const didUpdateRef = useRef(false);
    const lists = useSelector(state=>state.list.lists)
    const fetch = useSelector(state=>state.fetch.status)
    const dispatch = useDispatch();

    useEffect(() => {
      if(!didMountRef.current){
        dispatch(getLists())
        didMountRef.current = true;
      }
    },[lists])

    useEffect(() => {
      if(didUpdateRef.current && fetch.status == ('success')){
        dispatch(getLists())
        didUpdateRef.current = false;
      }
    },[fetch])

    async function handleDelete(id){
      dispatch(deleteAssignment(id))
      didUpdateRef.current = true
    }

    // function handleButtonDone(id){
    //   setId(id)
    //   setDialogDone(true)
    //   didMountRef.current = false;
    // }

    async function handleDone(id){
      dispatch(doAssignment(id))
      // alert(id)
      didUpdateRef.current = true
    }


    return (
        <List
          data={lists}
          onDelete={(id)=>handleDelete(id)}
          onDone={(id)=>handleDone(id)}
        />
    );
}

export default withRouter(Home);