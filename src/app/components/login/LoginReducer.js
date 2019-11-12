export function userSessionString (state = "", action) {
    switch (action.type) {
        case 'LOGIN_FETCH_DATA_SUCCESS':
            return action.sessionString;
        default:
            return state;
    }
}
export function userLogin (state = "", action) {
    switch (action.type) {
        case 'LOGIN_SET_USERLOGIN':
            console.log("Action=");
            console.log(action);
            return action.userLogin;
        default:
            return state;
    }
}
