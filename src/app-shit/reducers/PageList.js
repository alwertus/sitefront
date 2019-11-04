// main file = Store.js


export function pageListHasError(state = false, action) {
    switch (action.type) {
        case 'ITEMS_HAS_ERROR':
            return action.hasErrored;

        default:
            return state;
    }
}
 // pageListHasError, pageListIsLoading, pageList
export function pageListIsLoading(state = false, action) {
    switch (action.type) {
        case 'ITEMS_IS_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}

export function pageList(state = [], action) {
    switch (action.type) {
        case 'ITEMS_FETCH_DATA_SUCCESS':
            console.log("Get Items:");
            console.log(action.items);
            return action.items;

        default:
            return state;
    }
}

/*export default function (state, action) {
    switch (action.type) {
        case "UPDATE_PAGELIST":
            /*const response = '{"count":"4","errorCode":"0","items":[' +
                '{"name":"Главная","link":"link1","id":"1"},' +
                '{"name":"Володя","link":"link2","id":"2"},' +
                '{"name":"Мащьпулькэ","link":"link3","id":"3"},' +
                '{"name":"Гуманойд","link":"link4","id":"4"}' +
                '],"errorMsg":""}';
            const json = JSON.parse(response);*/

/*            try {
                const response = fetch('/menuitems', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json;charset=utf-8'},
                    body: JSON.stringify({
                        operation: "getMenuItems",
                        userLoginAs: localStorage.getItem("userLoginAs") == null ? "" : localStorage.getItem("userLoginAs"),
                        sessionString: localStorage.getItem("sessionString") == null ? "" : localStorage.getItem("sessionString")
                    })
                });

                const json = response.json();
                console.log("Take response");
                console.log(json);
                return json;
                /*this.setState({
                    items: json.items,
                    errorCode: json.errorCode
                });*/
 /*           } catch (error) {
                console.log("ERROR: " + error);
                // this.setState({errorCode: '1'});
            }
            break;
        default:
            return JSON.parse('{"count":"0","errorCode":"0","items":[],"errorMsg":""}');
    }

}
*/
