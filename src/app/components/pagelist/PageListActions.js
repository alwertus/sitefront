export function pageListHasError(bool) {
    return {
        type: 'PAGELIST_HAS_ERROR',
        hasError: bool
    };
}

export function pageListIsLoading(bool) {
    return {
        type: 'PAGELIST_IS_LOADING',
        isLoading: bool
    };
}

export function pageListFetchDataSuccess(items) {
    return {
        type: 'PAGELIST_FETCH_DATA_SUCCESS',
        items
    };
}

export function pageListNeedUpdate(bool) {
    return {
        type: 'PAGELIST_UPDATE',
        needUpdate: bool
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
                userLoginAs: localStorage.getItem("userName") == null ? "" : localStorage.getItem("userName"),
                sessionString: localStorage.getItem("userSession") == null ? "" : localStorage.getItem("userSession")
            })})
            .then((response) => {
                if (!response.ok)
                    throw Error(response.statusText);

                dispatch(pageListIsLoading(false));
                // dispatch(pageListNeedUpdate(false));
                return response;
            })
            .then((response) => response.json())
            .then((items) => dispatch(pageListFetchDataSuccess(items)))
            .catch(() => dispatch(pageListHasError(true)));
    };
}
