import React from "react";
import { Provider } from "react-redux";
import configureStore from "./store/ConfigureStore";
import PageListComponent from "./components/pagelist/PageListComponent";
import LoginComponent from "./components/login/LoginComponent";
import TreeComponent from "./components/tree/TreeComponent";
import PageComponent from "./components/page/PageComponent";
import { Switch, Route } from 'react-router-dom';
import "./App.css";

const store = configureStore();

const Home = () => (
    <div className="content-container">
        <span>Home Page</span>
    </div>
);

const Partition_Info = () => (
    <div className="content-container">
        <TreeComponent/>
        <PageComponent/>
    </div>
);

const Main = () => (
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/info" component={Partition_Info}/>
        </Switch>
);

export default () => (
    <Provider store={store}>
        <div className="header">
            <div className="pagelist-container"><PageListComponent /></div>
            <div className="login-container"><LoginComponent/></div>
        </div>
        <Main/>
    </Provider>
);
