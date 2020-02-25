import React from 'react';
import logo from './logo.svg';
import Dashboard from './templates/Dashboard'
import Loading from './templates/Loading'
import Message from './templates/Message'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import SignIn from './screens/Sign/SignIn'
import routes from './routes';
import 'bootstrap/dist/css/bootstrap.min.css';

const PrivateRoute = ({ Component, token, ...otherProps }) => {
  if(token) {
    return <Dashboard component={Component} />;
  } else {
    return <Redirect to='/login' />;
  }
}


function App(props) {
  return (
    <div className="wrapper" style={{height: '100vh'}}>
      <Loading/>
      <Message/>
      <Router>
        <Route exact path='/login' component={()=>props.token !== null ? <Redirect to="/"/> : <SignIn/>}/>
        {routes.map((route, key) => <Route key={key} exact path={route.path} render={() => <PrivateRoute Component={route.component} token={props.token} />} />)}
        {/* <SignIn/> */}
      </Router>
    </div>
  );
}

const mapStateToProps = ({ user }) => ({
  token: user.token
});

export default connect(mapStateToProps, null)(App);