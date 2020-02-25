
import React, { useState } from 'react';
import {
    Card,
    Button,
    ExpansionPanel,
    FormControlLabel,
    ExpansionPanelSummary,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
    ExpansionPanelDetails
  } from '@material-ui/core'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import DoneIcon from '@material-ui/icons/Done';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default function InputAutoComplete(props) {
    const [open, setOpen] = useState(false);
    const [dialogDone, setDialogDone] = useState(false);
    const [id, setId] = useState('');

    function formatDate(date) {
        var monthNames = [
          "January", "February", "March",
          "April", "May", "June", "July",
          "August", "September", "October",
          "November", "December"
        ];
      
        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();
      
        return day + ' ' + monthNames[monthIndex] + ' ' + year;
      }

    function handleButtonClick(id){
        setId(id)
        setOpen(true)
    }

    async function handleDelete(){
        props.onDelete(id)
        setOpen(false)
      }

    function handleDoneClick(id){
        setId(id)
        setDialogDone(true)
    }

    function handleDone(){
        props.onDone(id)
        setDialogDone(false)
    }

    return(
        <div>
        {((props.data.length>0)?props.data.map((item, key) => ( 
          <div key={key}>
            <ExpansionPanel style={{marginBottom: '1%',wordBreak: 'break-all'}}>
             <ExpansionPanelSummary
               expandIcon={<ExpandMoreIcon />}
               aria-label="Expand"
               aria-controls="panel1a-content"
               id="panel1a-header"
             >
               <Typography>{item.title}</Typography>
               <FormControlLabel
                style={{marginLeft: 'auto',}} className="float-right"
                aria-label="Acknowledge"
                onClick={event => event.stopPropagation()}
                onFocus={event => event.stopPropagation()}
                control={<Button variant="contained" color="secondary" onClick={()=>handleButtonClick(item.id)}><DeleteForeverIcon/></Button>}
               >
               </FormControlLabel>
               {!item.done?<FormControlLabel
                 aria-label="Acknowledge"
                 onClick={event => event.stopPropagation()}
                 onFocus={event => event.stopPropagation()}
                 control={<Button variant="contained" onClick={()=>handleDoneClick(item.id)} color="primary"><DoneIcon/></Button>}
               ></FormControlLabel>:null}
             </ExpansionPanelSummary>
             <ExpansionPanelDetails>
                <Typography>
                  {item.description}
                </Typography>
                <Typography style={{marginLeft: 'auto', fontSize: '12px',}}>{formatDate(new Date(item.date))}</Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </div>
        )):<h1 style={{textAlign:"center"}}>You have 0 things to do 8)</h1>)}
        <Dialog
          open={open}
          onClose={()=>setOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"are you sure you want to delete the assignment?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Once you delete an assignment it is impossible to recover it
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant='contained' color='default' onClick={()=>setOpen(false)}>
              Disagree
            </Button>
            <Button variant='contained' color='secondary' onClick={()=>handleDelete()} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={dialogDone}
          onClose={()=>setDialogDone(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"are you sure you want to mark assignment as done?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              this option will move this assignment to 'done', you can access all your done assignments on the sidebar
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant='contained' color='default' onClick={()=>setDialogDone(false)}>
              Disagree
            </Button>
            <Button variant='contained' color='secondary' onClick={()=>handleDone()} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
}