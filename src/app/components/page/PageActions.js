export function setPageData (newValue) { return { type: "SET_PAGE_DATA",      newValue:     newValue } }
export function setPageData_NeedUpdate (newValue) { return { type: "SET_PAGE_DATA_NEED_UPDATE",      newValue:     newValue } }
export function setPageTempData (newValue) { return { type: "SET_PAGE_TEMP_DATA",      newValue:     newValue } }

const errorPage = "Connection error";
const emptyPage = "<div>N<b>o</b> page</div>";
/*const emptyPage="<div><ul>\n" +
    "<li><h2>Условия сравнения</h2>\n" +
    "  Равно <code>=</code>, Меньше<code><</code>Больше<code>></code>Меньше или равно<code><=</code>Больше или равно<code>>=</code>Меньше или равно<code>>= <> != ^= ¬=</code></li>\n" +
    "\n" +
    "<li><h2>Логические условия</h2>\n" +
    "  <code>AND</code>, <code>OR</code>, <code>NOT</code>\n" +
    "</li>\n" +
    "\n" +
    "<li><h2>Приоритеты операторов</h2>\n" +
    "  Приоритет по умолчанию:\n" +
    "  <table>\n" +
    "    <tr><td>1</td><td>Арифметические операторы</td></tr>\n" +
    "    <tr><td>2</td><td>Оператор конкатенации</td></tr>\n" +
    "    <tr><td>3</td><td>Условия сравнения</td></tr>\n" +
    "    <tr><td>4</td><td>IS [NOT] NULL, LIKE, [NOT] IN</td></tr>\n" +
    "    <tr><td>5</td><td>[NOT] BETWEEN</td></tr>\n" +
    "    <tr><td>6</td><td>Не равен</td></tr>\n" +
    "    <tr><td>7</td><td>логическое условие NOT</td></tr>\n" +
    "    <tr><td>8</td><td>логическое условие AND</td></tr>\n" +
    "    <tr><td>9</td><td>логическое условие OR</td></tr>\n" +
    "  </table>\n" +
    "  Для изменения приоритета используются круглые скобки\n" +
    "</li>\n" +
    "\n" +
    "<li><h2>Сортировка (ORDER BY)</h2>\n" +
    "  Нужен для сортировки в выборке. Указывается последним. Имеет 2 значения:\n" +
    "  <ul><li><b>ASC</b> - по возрастанию (по умолчанию)</li>\n" +
    "      <li><b>DESC</b> - по убыванию</li></ul>\n" +
    "  Синтаксис: <code>SELECT выражение FROM таблица [WHERE условие(я)] [ORDER BY {столбец, выражение, номер_позиции} [ASC|DESC]];</code><br>\n" +
    "  Так же можно указать порядок отображения NULL-значений с помощью ключевых слов <code>NULLS FIRST</code> или <code>NULLS LAST</code><br>\n" +
    "  По умолчанию NULL-значения ассоциируются с самыми большими значениями и идут первыми/последними в зависимости от выбранного порядка сортировки\n" +
    "</li>\n" +
    "\n" +
    "<li><h2>Переменные подстановки</h2>\n" +
    "  <a href=\"https://ocpdevru.wordpress.com/2009/09/29/ampersand-substitution/\">Напочитать</a><br>\n" +
    "  Команда DEFINE позволяет создавать свои собственные переменные, продолжающие хранить заданные для них значения либо до конца всего данного сеанса SQL*Plus, либо до тех пор, пока не будет применена команда UNDEFINE, которая сбрасывает значения переменных.<br>\n" +
    "  Могут быть объявлены заранее, могут нет. Если не объявлены - то при попытке использования будет предложено их ввести.<br>\n" +
    "  <ul>\n" +
    "    <li>Использование как строка<br>\n" +
    "<code>define <b>tbname</b>='CX_PASS';\n" +
    "select * from all_tab_columns where table_name=<b>'&tbname'</b>;</code><br>\n" +
    "    Если в коде переменная используется более 1 раза - то следует использовать её с двумя <b>&</b></li>\n" +
    "\n" +
    "    <li>Использование как заранее подготовленный набор<br>\n" +
    "<code>define <b>columns</b>='COLUMN_NAME, DATA_TYPE';\n" +
    "select <b>&columns</b> from all_tab_columns where table_name='cx_pass';</code></li>\n" +
    "\n" +
    "  </ul>\n" +
    "<code>SET VERIFY ON/OFF</code> - включить/отключить запрос ввода переменных, если значение заранее не определено\n" +
    "</li>\n" +
    "\n" +
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
