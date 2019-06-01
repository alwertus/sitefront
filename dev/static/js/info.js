var
    winAdd              = $('.content-add-info-window'),
    winAdd_content      = $(".content-add-info-window-content"),
    winAdd_errorMsg     = $(".content-add-info-window-content-down-errormsg"),
    winAdd_titleText    = $('.content-add-info-window-content-top-line2 #text-title'),
    winEdit             = $('.dialog-edit__background'),
    winEdit_titleText   = $('#dialog-edit__title'),
    winEdit_contentText = $('#dialog-edit__content'),
    winEdit_errorMsg    = $('.dialog-edit__footer-errormsg');
    checkedRadioId      = 0;

// ===== ===== ===== ===== ===== ===== ===== ===== СОБЫТИЯ ===== ===== ===== ===== ===== ===== ===== =====

// "конструктор"
$(document).ready(function(){
    getContainer("0").empty();  // очищаем содержимое дерева
    refreshTreeRecords("0");    // обновляем дерево в корне
});

// кнопка отмена окна добавления / редактирования страницы
$('#btn-cancel').click(function () { closeAddPageWindow(); }); // клик на ЗАКРЫТЬ на окне добавления страницы
$('#dialog-edit__btn-cancel').click(function () { close_winEdit(); }); // клик на ЗАКРЫТЬ на окне добавления страницы

// кнопка добавления
$('#add-info').click(function () {                             // открыть окно добавления страницы
    show_winAdd();
    winAdd_content.attr("id","append_page");
});

// кнопка удаления
$('#del-info').click(function () {
    if (window.confirm('Точно удалить?')) {
        delRec();
    };
});

// кнопка редактирования
$('#edit-info').click(function () {                            // открыть окно добавления страницы
    var radioChecked = $('input[name=tree-radio]:checked');
    var sTitle = radioChecked.siblings("label").html();
    var sId = radioChecked.parent().parent().attr("id");
    var sContent = $('.content-info').html();
    show_winEdit();
    winEdit_titleText.val(sTitle);
    winEdit_contentText.val(sContent);
    winEdit.attr("id",sId);
});

// клик по надписи корня дерева
$('.tree-root-label').click(function () {
    $('input[name=tree-radio]:checked').prop('checked', false);
});

// Добавление - ОК кнопка
$('#btn-ok').click(function () {
    if (($.trim($("#text-content").val())).length == 0 || ($.trim($("#text-title").val())).length == 0) {
        // показываем сообщение об ошибке,
        // затем устанавливаем событие скрытия сообщения об ошибке при наборе текста
        winAdd_errorMsg.show(100);
        $("#text-content, #text-title").keypress(function (e) {
            winAdd_errorMsg.hide();
            // отключаем событие при первом вызове
            $("#text-content, #text-title").off('keypress');
        });
        return;
    }
    sendPageToServer(winAdd_content.attr("id"));
    closeAddPageWindow();
    var checkedElementID = ($('input[name=tree-radio]:checked').parent()).parent().attr("id");
    refreshTreeRecords(checkedElementID);
});

// Редактирование - ОК кнопка
$('#dialog-edit__btn-ok').click(function () {
    if (($.trim(winEdit_contentText.val())).length == 0 || ($.trim(winEdit_titleText.val())).length == 0) {
        // показываем сообщение об ошибке,
        // затем устанавливаем событие скрытия сообщения об ошибке при наборе текста
        winEdit_errorMsg.show(100);
        $("#dialog-edit__content, #dialog-edit__title").keypress(function (e) {
            winEdit_errorMsg.hide();
            // отключаем событие при первом вызове
            $("#dialog-edit__content, #dialog-edit__title").off('keypress');
        });
        return;
    }
    sendEditedPage();
    close_winEdit();
});

// свернуть/развернуть дерево
$(".tree").click(function (event) {
    event = event || window.event;                                          // для кроссбраузерности
    var clickedElement = $(event.target || event.srcElement);
    var parentElement = clickedElement.parent();

    if(clickedElement.hasClass("tree-expand") && !parentElement.hasClass("expandLeaf")) {
        if (parentElement.hasClass("expandOpen")) {                         // свернуть
            clickedElement
                .siblings(".tree-content")
                .children(".tree-radio")
                .trigger("click");                                          // эмулируем выбор страницы при скрывании списка
            parentElement.removeClass("expandOpen").addClass("expandClosed");
        }
        else {                                                              // развернуть
            refreshTreeRecords(parentElement.attr('id'));
            parentElement.removeClass("expandClosed").addClass("expandOpen");
        }
    }
});

// ===== ===== ===== ===== ===== ===== ===== ===== ФУНКЦИИ ===== ===== ===== ===== ===== ===== ===== =====

// закрыть окно добавления страницы
function closeAddPageWindow() {
    winAdd.hide(200);
    $('#text-title,#text-content').val('');
    winAdd_errorMsg.hide();
}

// закрыть окно редактирования страницы
function close_winEdit() {
    winEdit.hide(200);
    $('#dialog-edit__content, #dialog-edit__title').val('');
    winEdit_errorMsg.hide();
}

// показать окно добавления страницы
function show_winAdd() {
    winAdd.show(200);
    winAdd_titleText.focus();
}
// показать окно редактирования страницы
function show_winEdit() {
    winEdit.show(200);
    winEdit_titleText.focus();
}

// удалить запись
function delRec() {
    var elementID = ($('input[name=tree-radio]:checked').parent()).parent().attr("id");
    if (elementID == undefined || elementID == '0') return;
    $.ajax({
        type: 'POST',
        data: {
            "operation" : "del_page",
            "element" : elementID,      // ID удаляемого объекта
        },
        url: 'InfoPageServlet',
        success: function(serverData) {      // удачный запрос
            var IdParentRecord = serverData.serverInfo;
            console.log("Запись удалена. Обновить ветку: " + IdParentRecord);
            if (IdParentRecord != "-1") {
                refreshTreeRecords(IdParentRecord);
            }
        },
        error: function(e) {                // ошибка
            console.log("Ошибка обращения к серверу");
        }
    });
}

// добавление новой страницы на сервер
function sendPageToServer(operationType) {
    var elementID = ($('input[name=tree-radio]:checked').parent()).parent().attr("id");
    if (elementID == undefined) elementID = "0";
    $.ajax({
        type: 'POST',
        data: {
            "operation" : operationType,
            "title" : $("#text-title").val(),
            "page" : $("#text-content").val(),
            "element" : elementID,      // родитель к которому прикрепляется страница
        },
        url: 'InfoPageServlet',
        success: function(serverData) {      // удачный запрос
            var IdNewRecord = serverData.serverInfo;
            console.log("Результат добавления записи: " + IdNewRecord);
            if (IdNewRecord != "-1") {
                refreshTreeRecords(IdNewRecord);
            }
        },
        error: function(e) {                // ошибка
            console.log("Ошибка обращения к серверу");
        }
    });
}

// сохранить изменения на сервере
function sendEditedPage() {
    var elementID = ($('input[name=tree-radio]:checked').parent()).parent().attr("id");
    if (elementID == undefined) elementID = "0";
    $.ajax({
        type: 'POST',
        data: {
            "operation" : "edit_page",
            "title" : winEdit_titleText.val(),
            "page" : winEdit_contentText.val(),
            "record_id" : elementID,
            "element" : "-1",      // родитель к которому прикрепляется страница (оставляем текущий)
        },
        url: 'InfoPageServlet',
        success: function(serverData) {      // удачный запрос
            var IdUpdatedRecord = serverData.serverInfo;
            console.log("Результат редактирования записи: " + IdUpdatedRecord);
            if (IdUpdatedRecord != "-1") {
                refreshTreeRecords(IdUpdatedRecord);
                checkedRadioId = elementID;
            }
        },
        error: function(e) {                // ошибка
            console.log("Ошибка обращения к серверу");
        }
    });

}

// обновить ветку с сервера
function refreshTreeRecords(appendToId) {
    getContainer(appendToId).empty();                   // очищаем содержимое
    $.ajax({                                            // получаем новое с сервера
        type: 'POST',
        data: {
            'operation' : 'get_branch',
            'element' : appendToId
        },
        url: 'InfoPageServlet',
        success: function(serverData) {
            var childCount = serverData["serverInfo"].split(":")[1];
            var elementToAppend = $(".tree-node[id=" + appendToId + "]");

            // далее надо обновить элемент, у которого обновляем ветку (expandClosed, isLast)
            if (childCount > 0) {
                if (elementToAppend.hasClass("expandLeaf"))
                    elementToAppend.removeClass("expandLeaf");
                if (!elementToAppend.hasClass("expandClosed") && !elementToAppend.hasClass("expandOpen"))
                    elementToAppend.addClass("expandClosed");
            }

            // добавляем всех детишек и параметры для них
            for (let i = 0; i < childCount; i++) {
                // список классов для всех Node ( убрал expandClosed )
                var classList = ["tree-node"];
                    if (appendToId == "0") classList.push("isRoot");
                    if (serverData["child_count" + i] == "0") {
                        classList.push("expandLeaf");
                    }
                    else classList.push("expandClosed");
                    if (i == childCount-1)
                        classList.push("isLast");

                var newRowId = serverData['row_id' + i];
                var newTitle = serverData['title' + i];
                var newClasses = classList.join(" ");
                newNode(newRowId, newTitle, newClasses).appendTo(getContainer(appendToId));
                if (serverData["child_count" + i] == "1" && i == childCount -1) {
                    refreshTreeRecords(serverData['row_id' + i]);           // раскрыть дочерние если только 1 потомок
                }
            }
            if (checkedRadioId != 0) {
                $('#tree-radio__' + checkedRadioId).trigger("click");
                checkedRadioId = 0;
            }
        }
    });
}

// найти контейнер элемента
function getContainer(node_id) {
    return $("#tree-container__" + node_id);
}

// создать новый узел дерева
function newNode(node_id, node_text, node_class = "") {
    var node = $("<li>", {
        id: node_id,
        class: node_class,
    });
    node.append($("<div>",{ class: "tree-expand" }));
    node.append($("<div>", {class: "tree-content"})
        .append($("<input>",{
                name: "tree-radio",
                type: "radio",
                class: "tree-radio",
                id: "tree-radio__" + node_id
            }).change(function() {                           // при выборе Radio -
                refreshPage(node_id);                        // показываем страницу
            }).html(""))
        .append($("<label>", {
            class: "tree-content-label",
            for: "tree-radio__" + node_id
        }).html(node_text)));
    node.append($("<ul>", { class: "tree-container", id: "tree-container__" + node_id}));
    return node;
}

// получить и отобразить страницу
function refreshPage(id) {
    $.ajax({
        type: "POST",
        data: {
            "operation" : "get_html",
            "element" : id
        },
        url: 'InfoPageServlet',
        success:function(serverData)
        {
            $(".content-info").hide(200);
            $(".content-info").html(serverData.serverInfo);
            $(".content-info").show(200);
        },
        error: function(e)
        {
            $(".content-info").html("Нет ответа от сервера, либо инфа не найдена");
        }
    });
}