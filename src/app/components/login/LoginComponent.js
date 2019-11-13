import React, { Component} from 'react';
import { connect } from 'react-redux';
import {changeUserLogin, changeUserPassw, setErrorText, signIn} from './LoginActions';

class LoginComponent extends Component {

    constructor(props) {                                                                                                // регистрация функций
        super(props);
        this.onButtonClick_Login = this.onButtonClick_Login.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        console.log("userName:");
        console.log(localStorage.getItem("userName"));
    }

    render() {
        const BASE_ID = "Login";
        if (this.props.userIsLoading)
            return <div className="login-window">
                <p>Loading...</p>
            </div>;
        return <div className="login-window">
            <p>UserInfo:</p>
            <ul>
                <li>userLogin: {this.props.userLogin}</li>
                <li>userPassw: {this.props.userPassw}</li>
                <li>userName: {this.props.userName}</li>
                <li>userSessionString: {this.props.userSession}</li>
                <li>loading={this.props.userIsLoading ? "+" : "-"}</li>
            </ul>
            <p id={BASE_ID + "_Error_Text"}>{this.props.userErrorText}</p>
            <p id={BASE_ID + "_UserName_Text"}>{this.props.userName}</p>
            <div>
                <input name="userLogin" type="text" placeholder="Имя" onChange={this.onChange}/>
                <input name="userPass" type="password" placeholder="Пароль" onChange={this.onChange}/>
                <button onClick={this.onButtonClick_Login}>Go</button>
                <button onClick={this.onButtonClick_Logout}>Logout</button>
            </div>
        </div>;
    }

    onButtonClick_Login() {
        this.props.signIn(this.props.userLogin, this.props.userPassw);
    }

    onButtonClick_Logout() {
        console.log("Click: Logout");
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
        signIn: (userLogin, userPassw) => signIn(dispatch, userLogin, userPassw)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
