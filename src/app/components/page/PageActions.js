export function setPageData (newValue) { return { type: "SET_PAGE_DATA",      newValue:     newValue } }
export function setPageData_NeedUpdate (newValue) { return { type: "SET_PAGE_DATA_NEED_UPDATE",      newValue:     newValue } }
export function setPageTempData (newValue) { return { type: "SET_PAGE_TEMP_DATA",      newValue:     newValue } }

const errorPage = "Connection error";
const emptyPage = "<div>N<b>o</b> page</div>";
/*const emptyPage="<div>\n" +
    "<ul>\n" +
    "<li><b>Арифметические операции</b><div><br>\n" +
    "  Есть 4 операции: сложение <span class='red'>+</span>, вычитание <font color=\"red\">-</font>, умножение <font color=\"red\">*</font>, деление <font color=\"red\">/</font><br>\n" +
    "  <code>SELECT 10*15 FROM DUAL;\n" +
    "govno <span class='red bold'>jopa</span> her</code></div>\n" +
    "</li>\n" +
    "<li>Неопределенное значение (NULL)</li>\n" +
    "<li>Определение псевдонимов столбцов</li>\n" +
    "<li>Оператор конкатенации (||)</li>\n" +
    "<li>Дедубликация строк (DISTINCT)</li>\n" +
    "<li>Вывод структуры таблицы (DESCRIBE)</li>\n" +
    "</ul>\n" +
    "</div>";*/

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
