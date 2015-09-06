import React from 'react';
import {Route} from 'react-router';
import App from './App';
import Home from './Home';
import Champions from './Champions';
import About from './About';
import Login from './Login';
import NotFound from './NotFound';

export default (
  <Route component={App}>
    <Route path="/" component={Home}/>
    <Route path="/champions" component={Champions}/>
    <Route path="/about" component={About}/>
    <Route path="/login" component={Login}/>
    <Route path="*" component={NotFound}/>
  </Route>
);
