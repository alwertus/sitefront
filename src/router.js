import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import App from './App';
import Appp from './Appp';

export default (
    <Router history={browserHistory}>
        <Route path="/" component={ App } />
        <Route path="news" component={Appp } />
    </Router>
);