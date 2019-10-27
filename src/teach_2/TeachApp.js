import React from "react";
import MainMenu from "./components/MainMenu";
import Page from "./components/Page";
import {Provider} from "react-redux"; // связь хранилища и компонент
import {createStore} from "redux";
import AllReducers from "./reducers/AllReducers";

const store = createStore(AllReducers);

// элементы внутри провайдера будут иметь доступ к веб=хранилищу
const TeachApp = () => (
    <Provider store={store}>
        <p>Application</p>
        <MainMenu/>
        <hr/>
        <Page/>
        <p>End</p>
    </Provider>
);

export default TeachApp;