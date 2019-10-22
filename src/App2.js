import React from 'react';
import Header from './parts/header';
import Button from './parts/button';
import { Link } from "react-router";

class App2 extends React.Component {
    render() {
        return(
            <div className="wrapper2">
                <Header/>
                <Link to="/">Home</Link>
                <Link to="/news">News</Link>
                <div className="mid">
                    <Button/>
                </div>
            </div>
        );
    }
}

export default App2;