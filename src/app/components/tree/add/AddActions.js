export function changeTreeAddTitle (newValue) { return { type: "TREE_ADD_TITLE_CHANGE",      newValue:     newValue } }
export function setTreeNeedUpdate (newValue)   { return { type: "TREE_NEED_UPDATE",     needUpdate: newValue } }

export function sendNewTitle(parent, title) {
    return (dispatch) => {

        console.log("SEND TO SERVER parent=" + parent + " title=" + title);

        fetch('InfoPageList', {
            method: 'POST',
            headers: {'Content-Type': 'application/json;charset=utf-8'},
            body: JSON.stringify({
                operation: "add",
                title: title,
                parent: parent.toString()
            })})
            .then((response) => response.json())
            .then((response) => {
                dispatch(setTreeNeedUpdate(true));
                console.log("<< response 1", JSON.stringify(response));
                return response;
            })
            .catch(() => {
                console.log("<< response 2")
            });
    };
}