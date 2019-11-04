import React from "react";
import ConfigureStore from "./reducers/ConfigureStore";
import {Provider} from "react-redux";
import MainMenu from "./parts/page_list/MainMenu"; // связь хранилища и компонент

const appStates = ConfigureStore();

const App = () => (
    <Provider store={appStates}>
        <p>Header</p>
        <MainMenu/>
        <hr/>
        <p>Page</p>
        <hr/>
        <p>Footer</p>
    </Provider>
);

export default App;
