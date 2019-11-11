import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/ConfigureStore';
import PageListComponent from './components/PageListComponent';

const store = configureStore();

export default () => (
    <Provider store={store}>
        <PageListComponent />
    </Provider>
);
