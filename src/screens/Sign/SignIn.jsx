import React, { useState } from 'react';
import {  useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Attempt, Register } from '../../services/auth/auth';
import {
    Paper,
    Link,
    TextField,
    CssBaseline,
    Button,
    Avatar,
    Grid,
    Typography,
    makeStyles,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogActions,
    DialogTitle
} from '@material-ui/core'
import Image from '@material-ui/core/Paper';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import portrait from '../../assets/portrait.jpg'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${portrait})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignIn(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('')
  const [ registerOpen, setRegisterOpen ] = useState(false)
  const [ regUser, setRegUser ] = useState('')
  const [ regEmail, setRegEmail ] = useState('')
  const [ regPswd, setRegPswd ] = useState('')
  const [ regPswdConfirm, setRegPswdConfirm ] = useState('')
  const [ isOpen, setIsOpen ] = useState(false)

    function handleSubmit(e){
        e.preventDefault()
        dispatch(Attempt(email, password))
    }

    function handleRegister(e){
      e.preventDefault()
      
      if(regPswd === regPswdConfirm){
        dispatch(Register(regUser, regEmail, regPswd))
        setRegisterOpen(false)
      }else{
        setIsOpen(true)
      }
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image}/>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form onSubmit={(e)=>handleSubmit(e)}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              onChange={(e)=>setEmail(e.target.value)}
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              onChange={(text)=>setPassword(text.target.value)}
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              // onClick={(e)=>{handleSubmit(e)}}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="#" onClick={()=>setRegisterOpen(true)} variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
           </form>
          <Dialog open={registerOpen} onClose={()=>setRegisterOpen(false)} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
            <DialogContent>
              <DialogContentText>
                To subscribe to this website, please enter your credentials here.
              </DialogContentText>
                  <form onSubmit={(e)=>handleRegister(e)}>
                  <TextField
                    variant='outlined'
                    autoFocus
                    margin="dense"
                    required
                    onChange={(e)=>setRegUser(e.target.value)}
                    id="user"
                    label="user"
                    type="text"
                    fullWidth
                  />
                  <TextField
                    margin="dense"
                    variant='outlined'
                    required
                    onChange={(e)=>setRegEmail(e.target.value)}
                    id="email"
                    label="Email Address"
                    type="email"
                    fullWidth
                  />
                  <TextField
                    margin="dense"
                    variant='outlined'
                    required
                    onChange={(e)=>setRegPswd(e.target.value)}
                    id="pswd"
                    label="Password"
                    type="password"
                    fullWidth
                  />
                  <TextField
                  margin="dense"
                  required
                  variant='outlined'
                  id="pswd2"
                  onChange={(e)=>setRegPswdConfirm(e.target.value)}
                  label="Confirm Password"
                  type="password"
                  fullWidth
                />
                <DialogActions>
                  <Button onClick={()=>setRegisterOpen(false)} color="primary">
                    Cancel
                  </Button>
                  <Button type='submit' color="primary">
                    Subscribe
                  </Button>
                </DialogActions>
              </form>
            </DialogContent>
          </Dialog>
          <Snackbar  anchorOrigin={{ vertical: 'bottom',horizontal: 'center',}} open={isOpen} autoHideDuration={3000} onClose={()=>setIsOpen(false)}>
              <Alert severity='error' variant="filled">
                  Passwords dont match
              </Alert>
          </Snackbar>
        </div>
      </Grid>
    </Grid>
  );
}



export default (SignIn);