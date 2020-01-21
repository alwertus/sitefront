export function setPageData (newValue) { return { type: "SET_PAGE_DATA",      newValue:     newValue } }
export function setPageData_NeedUpdate (newValue) { return { type: "SET_PAGE_DATA_NEED_UPDATE",      newValue:     newValue } }
export function setPageTempData (newValue) { return { type: "SET_PAGE_TEMP_DATA",      newValue:     newValue } }

const emptyPage = "<div>N<b>o</b> page</div>";
const errorPage = "<div>Connection error</div>";

export function pageData_GetFromServer (id) {
    // return { type: "GET_PAGE_DATA",      newValue:     newValue }
    return (dispatch) => {
        if (id === "") {
            dispatch(setPageData(emptyPage));
            return;
        }


        // console.log("SEND TO SERVER update page=" + id);

        fetch('InfoPage', {
            method: 'POST',
            headers: {'Content-Type': 'application/json;charset=utf-8'},
            body: JSON.stringify({
                operation: "get",
                id: id.toString()
            })})
            .then((response) => response.json())
            .then((response) => {
                // console.log("response", response);
                // console.log("response.html", response.html);
                dispatch(setPageData_NeedUpdate(false));
                // console.log("<< response: ", JSON.stringify(response));
                return response;
            })
            .then((items) => {
                // console.log("items", items.html);
                dispatch(setPageData(items.html));
            })
            .catch((e) => {
                // console.log("<< response error: " + e);
                dispatch(setPageData(errorPage));
            });
    };
}
/*
export function sendDelRecord(id) {
    return (dispatch) => {

        console.log("SEND TO SERVER Delete Record id=" + id);

        fetch('InfoPageList', {
            method: 'POST',
            headers: {'Content-Type': 'application/json;charset=utf-8'},
            body: JSON.stringify({
                operation: "del",
                id: id.toString()
            })})
            .then((response) => response.json())
            .then((response) => {
                dispatch(setTreeNeedUpdate(true));
                console.log("<< response 1", JSON.stringify(response));
                return response;
            })
            .then((items) => {
                dispatch(setNewTree(items));
            })
            .catch(() => {
                console.log("<< response 2")
            });
    };
}
 */
