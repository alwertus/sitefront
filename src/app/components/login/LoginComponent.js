import React, { Component} from "react";
import { connect } from "react-redux";
import {changeUserLogin, changeUserPassw, setErrorText, signIn, logOut} from "./LoginActions";
import "./LoginComponent.css";

class LoginComponent extends Component {

    constructor(props) {                                                                                                // регистрация функций
        super(props);
        this.onButtonClick_Login = this.onButtonClick_Login.bind(this);
        this.onButtonClick_Logout = this.onButtonClick_Logout.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    availableControls() {
        if (this.props.userSession !== "")
            return (
                <div className="login-controls">
                    <button className="login-button" onClick={this.onButtonClick_Logout}>Logout</button>
                </div>
            );
        return (
            <div>
                <input className="login-input" name="userLogin" type="text" placeholder="Имя" onChange={this.onChange}/>
                <input className="login-input" name="userPass" type="password" placeholder="Пароль" onChange={this.onChange}/>
                <button className="login-button" onClick={this.onButtonClick_Login}>Go</button>
            </div>
        );
    }

    debugInfo() {
        return (
            <ul>
                <li>userLogin: {this.props.userLogin}</li>
                <li>userPassw: {this.props.userPassw}</li>
                <li>userName: {this.props.userName}</li>
                <li>userSessionString: {this.props.userSession}</li>
                <li>loading={this.props.userIsLoading ? "+" : "-"}</li>
            </ul>
        );
    }

    render() {
        if (this.props.userIsLoading)
            return <div className="login-wrapper">
                <p>Loading...</p>
            </div>;

        return <div className="login-wrapper">
            <div id="Login_UserName_Text">{this.props.userName}</div>
            {this.availableControls()}
            <div id="Login_Error_Text">{this.props.userErrorText}</div>
        </div>;
    }

    onButtonClick_Login() {
        this.props.signIn(this.props.userLogin, this.props.userPassw);
    }

    onButtonClick_Logout() {
        console.log("Click: Logout");
        this.props.logOut();
    }

    onChange(event) {
        this.props.clearErrorText();
        if (event.target.name === "userLogin") this.props.changeUserLogin(event.target.value);
        if (event.target.name === "userPass") this.props.changeUserPassw(event.target.value);
    }
}

const mapStateToProps = (state) => {
    return {
        userLogin: state.userLogin,
        userPassw: state.userPassw,
        userName: state.userName,
        userSession: state.userSession,
        userIsLoading: state.userIsLoading,
        userErrorText: state.userErrorText
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeUserLogin: (val) => dispatch(changeUserLogin(val)),
        changeUserPassw: (val) => dispatch(changeUserPassw(val)),
        clearErrorText: () => dispatch(setErrorText("")),
        signIn: (userLogin, userPassw) => signIn(dispatch, userLogin, userPassw),
        logOut: () => logOut(dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
