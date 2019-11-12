import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/ConfigureStore';
import PageListComponent from './components/PageListComponent';
import LoginComponent from './components/LoginComponent';

const store = configureStore();

export default () => (
    <Provider store={store}>
        <PageListComponent />
        <hr/>
        <LoginComponent/>
    </Provider>
);
