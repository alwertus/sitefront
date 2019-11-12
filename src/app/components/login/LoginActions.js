export function setUserLogin(newValue) {
    return {
        type: 'LOGIN_SET_USERLOGIN',
        userLogin: newValue
    };
}

export function setUserPassw(newValue) {
    return {
        type: 'LOGIN_SET_USERPASSW',
        userPassw: newValue
    };
}

export function loginRs(userInfo) {
    return {
        type: 'LOGIN_FETCH_DATA_SUCCESS',
        userInfo
    };
}

export function makeLogin() {
    console.log("input=" + this.state.userLogin);
    // console.log(obj);
    return (dispatch) => {
        fetch('/auth', {
            method: 'POST',
            headers: {'Content-Type': 'application/json;charset=utf-8'},
            body: JSON.stringify({
                operation: "login",
                userLogin: "",   //"testName",//this.state.userLogin,
                userPass: ""     //this.state.userPass
            })})
            .then((response) => response.json())
            .then((response) => {
                if (!response.ok)
                    console.log("ERROR makeLogin not OK: [error msg]");
                console.log("<<GET MESSAGE:");
                console.log(response);
                // dispatch();
                return response;
            })
            .catch(() => console.log("ERR catch"));
    }
}
