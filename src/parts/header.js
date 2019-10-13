import React from 'react';
import Login from './login';

class header extends React.Component {

    constructor(props) {
        super(props);

        let response = '{"count":"4","errorCode":"0","items":[' +
            '{"name":"Главная","link":"link1","id":"1"},' +
            '{"name":"Володя","link":"link2","id":"2"},' +
            '{"name":"Мащьпулькэ","link":"link3","id":"3"},' +
            '{"name":"Гуманойд","link":"link4","id":"4"}' +
            '],"errorMsg":""}';
        let json = JSON.parse(response);

        this.state = {
            items: json.items,
            errorCode: json.errorCode
        };
    }

    async componentDidMount() {
        // get available menu items
        try {
            const response = await fetch('/menuitems', {
                method: 'POST',
                headers: {'Content-Type': 'application/json;charset=utf-8'},
                body: JSON.stringify({
                    operation: "getMenuItems",
                    userLoginAs: localStorage.getItem("userLoginAs") == null ? "" : localStorage.getItem("userLoginAs"),
                    sessionString: localStorage.getItem("sessionString") == null ? "" : localStorage.getItem("sessionString")
                })
            });

            const json = await response.json();
            this.setState({
                items: json.items,
                errorCode: json.errorCode
            });
        } catch (error) {
            //TODO set 1
            this.setState({errorCode: '0'});
        }
    }

    render() {
        let innerComponent;

        if (this.state.errorCode === '0')
            innerComponent = (
                this.state.items.map(item => (
                    <li key={item.id}>
                        <a href={item.link} className={"menuitem"}>{item.name}</a>
                    </li>
                ))
            );
        else
            innerComponent = (
                <p className="error">Error load menu from server</p>
            );

            return <div className="mainmenu_line">
                <div className="mainmenu_nav">
                    {innerComponent}
                </div>
                <Login/>
            </div>

    }
}

export default header;