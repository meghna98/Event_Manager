import React from 'react';
import Login from './components/Login';
import './App.css';
import Main from './components/Main';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Register from './components/Register';
import User from './components/User';
import Authenticate from './components/Authenticate';
import SignOut from './components/SignOut';
import EventList from './components/EventList';
import PageLoader from './components/PageLoader';

function App() {
  return (
    <Router>
      <Switch>
    <Route path="/" exact component={Login}/>
    <Route path='/register' exact component={Register}/>
    <Route path='/login' exact component={Login}/>
    <Route path="/signout" exact component={SignOut}/>
    <Authenticate>
    <Route path='/events' exact component={EventList}/>
    <Route path='/manageevents' exact component={User}/>
    </Authenticate>
    </Switch>
    </Router>
  );
}

export default App;