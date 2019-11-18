export function changeUserLogin (newValue) { return { type: "USER_SET_LOGIN",      userLogin:     newValue } }
export function changeUserPassw (newValue) { return { type: "USER_SET_PASSW",      userPassw:     newValue } }
export function setUserName     (newValue) { return { type: "USER_SET_NAME",       userName:      newValue } }
export function setUserSession  (newValue) { return { type: "USER_SET_SESSION",    userSession:   newValue } }
export function setUserLoading  (newValue) { return { type: "USER_IS_LOADING",     userIsLoading: newValue } }
export function setErrorText    (newValue) { return { type: "USER_SET_ERROR_TEXT", userErrorText: newValue } }
export function pageListNeedUpdate    (newValue) { return { type: "PAGELIST_UPDATE", needUpdate: newValue } }

export function signIn(dispatch, userLogin, userPassw) {
    dispatch(setUserLoading(true));

    fetch('/auth', {
        method: 'POST',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        body: JSON.stringify({
            operation: "login",
            userLogin: userLogin,
            userPass: userPassw
        })})
        .then((response) => response.json())
        .then((response) => {
            dispatch(setUserLoading(false));

            dispatch(setUserSession(response.sessionString));
            dispatch(setUserName(response.userName));
            dispatch(setErrorText(response.errorMsg));
            dispatch(changeUserLogin(""));
            dispatch(changeUserPassw(""));

            dispatch(pageListNeedUpdate(true));
            return response;
        })
        .catch(() => {
            dispatch(setUserSession(""));
            dispatch(setUserName("Noname"));
            dispatch(setErrorText("Error Get Response"))});
}

export function logOut(dispatch) {
    dispatch(setUserName("Гость"));
    dispatch(setUserSession(""));
    dispatch(pageListNeedUpdate(true));
}
