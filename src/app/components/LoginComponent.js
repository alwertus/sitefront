import React, { Component} from 'react';
import { connect } from 'react-redux';
// import { itemsFetchData } from '../actions/PageListActions';

class LoginComponent extends Component {
    baseStyleId = "Login";

    componentDidMount() {

        /*
         получить данные:

         */

        /*localStorage.setItem("userLoginAs", "Alwertus");
        localStorage.setItem("sessionString", "123");
        this.props.fetchData();*/
    }

    render() {
        return <div className="login-window">
            <p id={this.baseStyleId + "_Error_Text"}>Текст ошибки</p>
            <p id={this.baseStyleId + "_UserName_Text"}>UserName</p>
            <div>
                <input name="userLogin" type="text" placeholder="Имя" onChange={this.onChange}/>
                <input name="userPass" type="password" placeholder="Пароль" onChange={this.onChange}/>
                <button onClick={this.onButtonClick_Login}>Go</button>
                <button onClick={this.onButtonClick_Logout}>Logout</button>
            </div>
        </div>;
        /*if (this.props.hasError) {
            console.log("render has error");
            return <p>Error loading</p>;
        }

        if (this.props.isLoading) {
            console.log("render is loading");
            return <p>Loading…</p>;
        }

        return (
            <ul>
                {this.props.items.map((item) => (
                    <li key={item.id}>
                        {item.name}
                    </li>
                ))}
            </ul>
        );*/
    }

    onButtonClick_Login() {
        console.log("Click: Login");
    }

    onButtonClick_Logout() {
        console.log("Click: Logout");
    }

    onChange() {
        console.log("OnChange");
    }

}



const mapStateToProps = (state) => {
    return {
        // items: state.pageList,
        // hasError: state.pageListHasError,
        // isLoading: state.pageListIsLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        // fetchData: () => dispatch(itemsFetchData())
        //fetchData: (param1) => dispatch(itemsFetchData(param1)) param1 - так можно передать функции параметр
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
