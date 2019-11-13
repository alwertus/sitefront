export function changeUserLogin(newValue) {
    return {
        type: "USER_SET_LOGIN",
        userLogin: newValue
    }
}

export function changeUserPassw(newValue) {
    return {
        type: "USER_SET_PASSW",
        userPassw: newValue
    }
}

export function setUserName(newValue) {
    return {
        type: "USER_SET_NAME",
        userName: newValue
    }
}

export function setUserSession(newValue) {
    return {
        type: "USER_SET_SESSION",
        userSession: newValue
    }
}

export function signIn(dispatch) {
    console.log("signIn.begin");
    dispatch(setUserLoading(true));
    wait(3000);
    dispatch(setUserLoading(false));
    dispatch(changeUserLogin("incommingUserLogin"));
    dispatch(changeUserPassw("incommingUserPassw"));
    dispatch(setUserName("USER_NAME"));
    dispatch(setUserSession("!@#$%-SESSION-$#@!"));

    console.log("signIn.end");
}

export function setUserLoading(b) {
    console.log("set " + b)
    return {
        type: "USER_IS_LOADING",
        userIsLoading: b
    }
}







//TODO delete this "wait" function
function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
        end = new Date().getTime();
    }
}



/*
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
*/
