import React from 'react';
import Header from './parts/header';
import Button from './parts/button';
import { Link } from "react-router";

class App extends React.Component {
    render() {
        return(
            <div className="wrapper">
                <Header/>
                <Link to="/">Home</Link>
                <Link to="/news">News</Link>
            </div>
        );
    }
}
export default App;
