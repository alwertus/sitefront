import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Router, Route, Switch } from "react-router";
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import App from './App';
import App2 from "./App2";

// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render((
    <BrowserRouter>
        <Route path="/" component={App} />
        <Route path="news" component={App2} />
    </BrowserRouter>
),document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
