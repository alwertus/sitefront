import React from 'react';
import Header from './parts/header';
import Button from './parts/button';

class App2 extends React.Component {
    render() {
        return(
            <div className="wrapper2">
                <Header/>
                <div className="mid">
                    <Button/>
                </div>
            </div>
        );
    }
}

export default App2;