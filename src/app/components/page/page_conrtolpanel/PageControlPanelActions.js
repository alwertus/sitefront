export function setPageEditMode (newValue) { return { type: "SET_PAGE_EDIT_MODE",      newValue:     newValue } }
export function setPageTempData (newValue) { return { type: "SET_PAGE_TEMP_DATA",      newValue:     newValue } }
export function setPageData_NeedUpdate (newValue) { return { type: "SET_PAGE_DATA_NEED_UPDATE",      newValue:     newValue } }

export function sendNewPageToServer (id, html) {
    return (dispatch) => {
        console.log("TRY SEND id=" + id, "html:", html);
        fetch('InfoPage', {
            method: 'POST',
            headers: {'Content-Type': 'application/json;charset=utf-8'},
            body: JSON.stringify({
                operation: "set",
                id: id.toString(),
                html: html
            })})
            .then((response) => response.json())
            .then((response) => {
                dispatch(setPageData_NeedUpdate(true));
                return response;
            })
            .catch((e) => {
                console.log("Connection error: " + e.toString());
            });
    }
}