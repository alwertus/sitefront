import React from 'react';
import {BrowserRouter, Link, Switch, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import allReducers from "./reducers/allReducers";

//------------------------------------ store
const store = createStore(allReducers);
//------------------------------------

const Component1 = () => (<h1>COMPONENT 1</h1>);
const Component2 = () => (<h1>COMPONENT 2</h1>);
const Component3 = () => (<h1>COMPONENT 3</h1>);

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Component1}/>
            <Route exact path='/page2' component={Component2}/>
            <Route exact path='/page3' component={Component3}/>
        </Switch>
    </main>
);

const Header = () => (
    <header>
        <nav>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/page2'>Page2</Link></li>
                <li><Link to='/page3'>Page3</Link></li>
            </ul>
        </nav>
    </header>
);

const Router = () => (
    <BrowserRouter>
        <div>
            <Header />
            <Main/>
        </div>
    </BrowserRouter>
);

class TeachApp extends React.Component {
    render() {
        return(
            <Provider store={store}><Router/></Provider>
        );
    }
}

export default TeachApp;