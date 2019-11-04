// создатели действий - возвращают объект действия

export function itemsHasError(bool) {
    return {
        type: 'PAGELIST_HAS_ERROR',
        hasErrored: bool
    };
}

export function itemsIsLoading(bool) {
    return {
        type: 'PAGELIST_IS_LOADING',
        isLoading: bool
    };
}

export function itemsFetchDataSuccess(items) {
    return {
        type: 'PAGELIST_FETCH_DATA_SUCCESS',
        items
    };
}



export function itemsFetchData() {
    return (dispatch) => {
        dispatch(itemsIsLoading(true));

/*        fetch("/menuitems", {
            method: 'POST',
            headers: {'Content-Type': 'application/json;charset=utf-8'},
            body: JSON.stringify({
                operation: "getMenuItems",
                userLoginAs: localStorage.getItem("userLoginAs") == null ? "" : localStorage.getItem("userLoginAs"),
                sessionString: localStorage.getItem("sessionString") == null ? "" : localStorage.getItem("sessionString")
            })}*/
fetch("http://599167402df2f40011e4929a.mockapi.io/items")
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                dispatch(itemsIsLoading(false));
                return response;
            })
            .then((response) => response.json())
            .then((items) => dispatch(itemsFetchDataSuccess(items)))
            .catch(() => dispatch(itemsHasError(true)));
    };
}
/*
const response = await fetch('/menuitems', {
                method: 'POST',
                headers: {'Content-Type': 'application/json;charset=utf-8'},
                body: JSON.stringify({
                    operation: "getMenuItems",
                    userLoginAs: localStorage.getItem("userLoginAs") == null ? "" : localStorage.getItem("userLoginAs"),
                    sessionString: localStorage.getItem("sessionString") == null ? "" : localStorage.getItem("sessionString")
                })
            });

            const json = await response.json();*/
