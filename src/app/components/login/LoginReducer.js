export function userLogin(state = "", action) {
    switch (action.type) {
        case "USER_SET_LOGIN":
            return action.userLogin;
        default:
            return state;
    }
}

export function userPassw(state = "", action) {
    switch (action.type) {
        case "USER_SET_PASSW":
            return action.userPassw;
        default:
            return state;
    }
}

export function userName(state = localStorage.getItem("userName") == null ? "Noname" : localStorage.getItem("userName"), action) {
    switch (action.type) {
        case "USER_SET_NAME":
            localStorage.setItem("userName", action.userName);
            return action.userName;
        default:
            return state;
    }
}

export function userSession(state = localStorage.getItem("userSession") == null ? "" : localStorage.getItem("userSession"), action) {
    switch (action.type) {
        case "USER_SET_SESSION":
            localStorage.setItem("userSession", action.userSession);
            return action.userSession;
        default:
            return state;
    }
}

export function userIsLoading(state = false, action) {
    switch (action.type) {
        case "USER_IS_LOADING":
            return action.userIsLoading;
        default:
            return state;
    }
}

export function userErrorText(state = "", action) {
    switch (action.type) {
        case "USER_SET_ERROR_TEXT":
            return action.userErrorText;
        default:
            return state;
    }
}


/*
export function userSessionString (state = "", action) {
    switch (action.type) {
        case "LOGIN_FETCH_DATA_SUCCESS":
            return action.sessionString;
        default:
            return state;
    }
}

export function userLogin (state = "", action) {
    switch (action.type) {
        case "LOGIN_SET_USERLOGIN":
            console.log("Action=");
            console.log(action);
            return action.userLogin;
        default:
            return state;
    }
}
*/
