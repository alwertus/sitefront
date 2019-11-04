export function pageListHasError(bool) {
    return {
        type: 'PAGELIST_HAS_ERROR',
        hasErrored: bool
    };
}

export function pageListIsLoading(bool) {
    return {
        type: 'PAGELIST_IS_LOADING',
        isLoading: bool
    };
}

export function pageListFetchDataSuccess(items) {
    console.log("get");
    console.log(items);
    return {
        type: 'PAGELIST_FETCH_DATA_SUCCESS',
        items
    };
}

export function itemsFetchData() {
    return (dispatch) => {
        dispatch(pageListIsLoading(true));
        fetch('/menuitems', {
            method: 'POST',
            headers: {'Content-Type': 'application/json;charset=utf-8'},
            body: JSON.stringify({
                operation: "getMenuItems",
                userLoginAs: localStorage.getItem("userLoginAs") == null ? "" : localStorage.getItem("userLoginAs"),
                sessionString: localStorage.getItem("sessionString") == null ? "" : localStorage.getItem("sessionString")
            })})
            .then((response) => {
                if (!response.ok)
                    throw Error(response.statusText);

                dispatch(pageListIsLoading(false));
                return response;
            })
            .then((response) => response.json())
            .then((items) => dispatch(pageListFetchDataSuccess(items)))
            .catch(() => dispatch(pageListHasError(true)));
    };
}
