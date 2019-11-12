import React, { Component} from 'react';
import { connect } from 'react-redux';
import { makeLogin, setUserLogin, setUserPassw } from './LoginActions';

class LoginComponent extends Component {

    constructor(props) {
        super(props);
        this.onButtonClick_Login = this.onButtonClick_Login.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
    }

    render() {
        const BASE_ID = "Login";
        return <div className="login-window">
            <p id={BASE_ID + "_Error_Text"}>Текст ошибки</p>
            <p id={BASE_ID + "_UserName_Text"}>UserName</p>
            <div>
                <input name="userLogin" type="text" placeholder="Имя" onChange={this.onChange}/>
                <input name="userPass" type="password" placeholder="Пароль" onChange={this.onChange}/>
                <button onClick={this.props.makeLogin}>Go</button>
                <button onClick={this.onButtonClick_Logout}>Logout</button>
            </div>
        </div>;
    }

    onButtonClick_Login() {
        this.props.makeLogin();
    }

    onButtonClick_Logout() {
        console.log("Click: Logout");
    }

    onChange(event) {
        if (event.target.name === "userLogin") this.props.setUserLogin(event.target.value);
        if (event.target.name === "userPass") this.props.setUserLogin(event.target.value);
        // if (event.target.name === "userLogin") this.sLogin = event.target.value;
        // if (event.target.name === "userPass") this.sPassw = event.target.value;
    }
}

const mapStateToProps = (state) => {
    return {
        sessionString: state.userSessionString,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
         // makeLogin: (userInfo) => dispatch(makeLogin(userInfo.sLogin, userInfo.sPassw))
        makeLogin: (param1) => dispatch(makeLogin(param1)),
        setUserLogin: (val) => dispatch(setUserLogin(val)),
        setUserPassw: (val) => dispatch(setUserPassw(val))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
