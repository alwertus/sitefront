import React from 'react';

class login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userLoginAs: "Гость",
            userLogin: "",
            userPass: "",
            showError_wrongUser: "hide",
            errorText: "Error",
            sessionString: "",
            hideLoginForm: "",
            hideLogoutForm: "hide"
        };

        this.onChange = this.onChange.bind(this);
        this.onButtonClick_Login = this.onButtonClick_Login.bind(this);
        this.onButtonClick_Logout = this.onButtonClick_Logout.bind(this);
    }
    componentDidMount() {
        let userLoginAs = localStorage.getItem("userLoginAs") == null ? "" : localStorage.getItem("userLoginAs");
        let sessionString = localStorage.getItem("sessionString") == null ? "" : localStorage.getItem("sessionString");
        if (userLoginAs !== "") {
            this.setState({
                userLoginAs: userLoginAs,
                userLogin: "",
                userPass: "",
                showError_wrongUser: "hide",
                errorText: "Error",
                sessionString: sessionString,
                hideLoginForm: "hide",
                hideLogoutForm: ""
            });
        }
    }

    async onButtonClick_Logout() {
        console.log("logout");
        let sessionString = localStorage.getItem("sessionString") == null ? "" : localStorage.getItem("sessionString");
        localStorage.removeItem("userLoginAs");
        localStorage.removeItem("sessionString");

        this.setState({
            sessionString: "",
            userLoginAs: "Гость",
            userLogin: "",
            userPass: "",
            hideLoginForm: "",
            hideLogoutForm: "hide"
        });

        const request = await fetch('/auth', {
            method: 'POST',
            headers: {'Content-Type': 'application/json;charset=utf-8'},
            body: JSON.stringify({
                operation: "logout",
                sessionString: sessionString
            })
        });
        const json = await request.json();

        window.location.reload();
    }

    async onButtonClick_Login() {
        console.log("button pressed = " + this.state.userLogin + " : " + this.state.userPass);

        if (this.state.userLogin === "" || this.state.userPass === "") {
            this.setState({
                errorText: "Необходимо ввести Имя и Пароль",
                showError_wrongUser: ""
            });
            return ;
        }

        try {
            const request = await fetch('/auth', {
                method: 'POST',
                headers: {'Content-Type': 'application/json;charset=utf-8'},
                body: JSON.stringify({
                    operation: "login",
                    userLogin: this.state.userLogin,
                    userPass: this.state.userPass
                })
            });

            /*for test*/
            // let response = '{"loginName":"Petya","sessionString":"1234567890","errorCode":"0","errorMsg":"Takogo usera tut netu"}';
            // let json = JSON.parse(response);
            const json = await request.json();
            /**/

            if (json.errorCode === "0") {
                this.setState({
                    sessionString: json.sessionString,
                    userLoginAs: json.loginName,
                    userLogin: "",
                    userPass: "",
                    hideLoginForm: "hide",
                    hideLogoutForm: ""
                });
                localStorage.setItem("userLoginAs", this.state.userLoginAs);
                localStorage.setItem("sessionString", this.state.sessionString);
                window.location.reload();
            }
            else
                this.setState({
                    errorText: json.errorMsg,
                    showError_wrongUser: "",
                    userLogin: "",
                    userPass: ""
                });

        } catch (error) {
            this.setState({
                showError_wrongUser: "",
                errorText: "Connection problem. Try later"
            });
        }
    }

    // onChange text field username and password
    onChange(event) {
        this.setState({[event.target.name]: event.target.value});
        if (this.state.showError_wrongUser !== "hide")
            this.setState({showError_wrongUser: "hide"});
    }

    render() {
        return <div className="login-window">
            <p id="errUserNotCorrect" className={"error " + this.state.showError_wrongUser}>{this.state.errorText}</p>
            <p id="UserName_Text">{this.state.userLoginAs}</p>
            <div>
                <input className={"userName_input " + this.state.hideLoginForm} name="userLogin" type="text" placeholder="Имя" onChange={this.onChange} value={this.state.userLogin}/>
                <input className={"userPass_input " + this.state.hideLoginForm} name="userPass" type="password" placeholder="Пароль" onChange={this.onChange} value={this.state.userPass}/>
                <button className={"button_sendAuth " + this.state.hideLoginForm} onClick={this.onButtonClick_Login}>Go</button>
                <button className={"button_sendAuth " + this.state.hideLogoutForm} onClick={this.onButtonClick_Logout}>Logout</button>
            </div>
        </div>
    }
}

export default login;