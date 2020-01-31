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

/*const Home = () => (
    <div>
        <h1>Welcome to Home</h1>
    </div>
);

const Page1 = () => (
    <div>
        <h1>Page ODIN</h1>
    </div>
);

const SubmenuAPI = {
    submenues: [
        { number: 1, name: "Submenu 1", position: "G" },
        { number: 2, name: "Submenu 2", position: "A" },
        { number: 3, name: "Submenu 3", position: "Z" },
        { number: 4, name: "Submenu 4", position: "S" },
        { number: 5, name: "Submenu 5", position: "F" }
    ],
    all: function() { return this.submenues },
    get: function(id) {
        const isMenu = m => m.number === id;
        return this.menues.find(isMenu);
    }
};

const Page2Home = () => (
    <div>
        <h1>Page 2 Home</h1>
    </div>
)

const Page2Number = (props) => {
    console.log(props);
    const submenu = SubmenuAPI.get(parseInt(props.match.params.number, 10));
    if (!submenu)
        return <div>Sorry, you are noob</div>
    return <div>
        <h1>{submenu.name} (#{submenu.number})</h1>
        <h2>Position: {submenu.position}</h2>
        <Link to='/Page2'>Back</Link>
    </div>
}

const Page2 = () => (
    <Switch>
        <Route exact path='/Page2' component={Page2Home}/>
        <Route path='/Page2/:number' component={Page2Number}/>
    </Switch>
);

const Header = () => (
    <div>
        <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/Page1'>1 Page</Link></li>
            <li><Link to='/Page2'>2 Page</Link>
                <ul>
                    {
                        SubmenuAPI.all().map(m => (
                                <li key={m.number}>
                                    <Link to={`/Page2/${m.number}`}>{m.name}</Link>
                                </li>
                            )
                        )
                    }
                </ul>
            </li>
        </ul>
    </div>
);

const Main = () => (
    <div>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/Page1" component={Page1}/>
            <Route exact path="/Page2" component={Page2}/>
        </Switch>
    </div>
);

export default () => (
    <div>
        <Header/>
        <Main/>
    </div>
);*/

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
