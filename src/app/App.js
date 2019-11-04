import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/ConfigureStore';
import ItemList from './components/ItemList';

const store = configureStore();

export default () => (
    <Provider store={store}>
        <ItemList />
    </Provider>
);
