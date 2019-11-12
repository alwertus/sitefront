import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/ConfigureStore';
import PageListComponent from './components/pagelist/PageListComponent';
import LoginComponent from './components/login/LoginComponent';

const store = configureStore();

export default () => (
    <Provider store={store}>
        <PageListComponent />
        <hr/>
        <LoginComponent/>
    </Provider>
);
