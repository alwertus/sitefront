export function setNewTree (newValue)          { return { type: "TREE_SET_ITEMS",       newValue: newValue } }
export function setTreeExpanded (id, newValue) { return { type: "TREE_CHANGE_EXPANDED", newValue: newValue, id: id } }
export function setTreeActivePage (newValue)   { return { type: "TREE_SET_ACTIVEPAGE",  newValue: newValue } }
export function setTreeNeedUpdate (newValue)   { return { type: "TREE_NEED_UPDATE",     needUpdate: newValue } }
export function setTreeIsLoading (newValue)    { return { type: "TREE_IS_LOADING",      newValue: newValue } }
export function setTreeHasError (newValue)     { return { type: "TREE_HAS_ERROR",       newValue: newValue } }
export function setTreeAddElement_ShowDialog (newValue) { return { type: "TREE_ADD_DIALOG_SHOW", newValue: newValue } }
export function setPageData_NeedUpdate (newValue) { return { type: "SET_PAGE_DATA_NEED_UPDATE",      newValue:     newValue } }

export function treeItemsFetchData() {
    return (dispatch) => {
        dispatch(setTreeIsLoading(true));
        fetch('InfoPageList', {
            method: 'POST',
            headers: {'Content-Type': 'application/json;charset=utf-8'},
            body: JSON.stringify({
                operation: "show"/*,
                userLoginAs: localStorage.getItem("userName") == null ? "" : localStorage.getItem("userName"),
                sessionString: localStorage.getItem("userSession") == null ? "" : localStorage.getItem("userSession")*/
            })})
            .then((response) => {
                if (!response.ok)
                    throw Error(response.statusText);

                dispatch(setTreeIsLoading(false));
                dispatch(setTreeNeedUpdate(false));
                return response;
            })
            .then((response) => response.json())
            .then((items) => {
                dispatch(setNewTree(items));
            })
            .catch(() => dispatch(setTreeHasError(true)));
    };
}

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
