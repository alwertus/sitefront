import React from "react";
import { Provider } from "react-redux";
import configureStore from "./store/ConfigureStore";
import PageListComponent from "./components/pagelist/PageListComponent";
import LoginComponent from "./components/login/LoginComponent";
import TreeComponent from "./components/tree/TreeComponent";
import ButtonComponent from "./components/button/ButtonComponent";
import "./App.css";

const store = configureStore();

export default () => (
    <Provider store={store}>
        <div className="header">
            <div className="pagelist-container"><PageListComponent /></div>
            <div className="login-container"><LoginComponent/></div>
        </div>
        <div className="content-container">
            <TreeComponent/>
            <hr/>
            <p>Тестовые логин/пароль:</p>
            <ul>
                <li>1/1</li>
                <li>2/2</li>
                <li>3/3</li>
            </ul>
            <ButtonComponent/>
        </div>
    </Provider>
);
