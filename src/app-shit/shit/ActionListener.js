// main file = Store.js

import PageList from "../reducers/PageList";

// слушатель событий. Action - имя события
 export default function (state = null, action) {

    console.log("!!!!ActionListener: " + action);
    console.log(action);
    switch (action.type) {
        case "UPDATE_PAGELIST":
            return PageList;
            /*console.log("111");
            const response = '{"count":"4","errorCode":"0","items":[' +
                '{"name":"Главная","link":"link1","id":"1"},' +
                '{"name":"Володя","link":"link2","id":"2"},' +
                '{"name":"Мащьпулькэ","link":"link3","id":"3"},' +
                '{"name":"Гуманойд","link":"link4","id":"4"}' +
                '],"errorMsg":""}';
            const json = JSON.parse(response);
            console.log(json);
            return json;*/
            /*return [
                { id: 1, name: 'menu1' },
                { id: 2, name: 'menu2' },
                { id: 3, name: 'menu3' }
            ];*/
        default:
            return {};
            /*[
                { id: 1, name: 'kmenu1' },
                { id: 2, name: 'kmenu2' },
                { id: 3, name: 'kmenu3' }
            ];*/

    }


/*    let response = '{"count":"4","errorCode":"0","items":[' +
    '{"name":"Главная","link":"link1","id":"1"},' +
    '{"name":"Володя","link":"link2","id":"2"},' +
    '{"name":"Мащьпулькэ","link":"link3","id":"3"},' +
    '{"name":"Гуманойд","link":"link4","id":"4"}' +
    '],"errorMsg":""}';
    let json = JSON.parse(response);*/

    // return async function(pages) {
        //console.log(this.setState());
        /*this.pages = [
            { id: 1, name: 'menu1' },
            { id: 2, name: 'menu2' },
            { id: 3, name: 'menu3' },
            { id: 4, name: 'menu4' }
        ];*/
        // try {
    /*        const response = await fetch('/menuitems', {
                method: 'POST',
                headers: {'Content-Type': 'application/json;charset=utf-8'},
                body: JSON.stringify({
                    operation: "getMenuItems",
                    userLoginAs: localStorage.getItem("userLoginAs") == null ? "" : localStorage.getItem("userLoginAs"),
                    sessionString: localStorage.getItem("sessionString") == null ? "" : localStorage.getItem("sessionString")
                })
            });

            const json = await response.json();*/
            // this.setState({
            //     items: json.items,
            //     errorCode: json.errorCode
            // });
        // } catch (error) {
            // console.log("ERROR: " + error);
            // this.setState({errorCode: '1'});
        // }
    // }

}
