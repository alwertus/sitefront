import React from 'react';
import ReactDOM from 'react-dom';
import Router from './router';

ReactDOM.render(Router, document.getElementById('root'));

/*import { Router, Route, Switch } from "react-router";
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import './index.css';
import App from './App';
import App2 from "./App2";

// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render((
    <BrowserRouter>
        <Route path="/" component={App} />
        <Route path="/news" component={App2} />
    </BrowserRouter>
),document.getElementById('root'));
*/
//serviceWorker.unregister();
