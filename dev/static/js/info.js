$(document).ready(function(){
    getContainer("0").empty();
    refreshTreeRecords("0");
});
$('#btn-cancel').click(function () { closeAddPageWindow(); }); // клик на ЗАКРЫТЬ на окне добавления страницы
$('#add-info').click(function () {                             // открыть окно добавления страницы
    showAddPageWindow();
    $(".content-add-info-window-content").attr("id","append_page");
});
$('#edit-info').click(function () {                            // открыть окно добавления страницы
    showAddPageWindow()
    $("#text-title").val("123");
    // установка текста
    $("#text-content").val($('.content-info').outerHTML);

    $(".content-add-info-window-content").attr("id","edit_page");
});

$('.tree-root-label').click(function () {
    $('input[name=tree-radio]:checked').prop('checked', false);
});

// закрыть окно добавления страницы
function closeAddPageWindow() {
    $('.content-add-info-window').hide(200);
    $('#text-title,#text-content').val('');
    $(".content-add-info-window-content-down-errormsg").hide();
}

// показать окно добавления страницы
function showAddPageWindow() {
    $('.content-add-info-window').show(200);
    $('.content-add-info-window-content-top-line2 #text-title').focus();
}

// клик на ОК на окне добавления страницы
$('#btn-ok').click(function () {
    if (($.trim($("#text-content").val())).length == 0 || ($.trim($("#text-title").val())).length == 0) {
        // показываем сообщение об ошибке, затем устанавливаем событие при наборе текста, чтоб это сообщение скрыть
        $(".content-add-info-window-content-down-errormsg").show(100);
        $("#text-content, #text-title").keypress(function (e) {
            $(".content-add-info-window-content-down-errormsg").hide();
            // отключаем событие при первом вызове
            $("#text-content, #text-title").off('keypress');
        });
        return;
    }
    sendPageToServer($(".content-add-info-window-content").attr("id"));
    closeAddPageWindow();
    var checkedElementID = ($('input[name=tree-radio]:checked').parent()).parent().attr("id");
    refreshTreeRecords(checkedElementID);
});

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
            "element" : elementID,
        },
        url: 'InfoPageServlet',
        success: function(serverData) {      // удачный запрос
            var IdNewRecord = serverData.serverInfo;
            console.log("Результат добавления записей: " + IdNewRecord);
            if (IdNewRecord != "-1") {
                refreshTreeRecords(IdNewRecord);
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
                //elementToAppend.removeClass("isLast");
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
                        // if (i == childCount-1) classList.push("isLast");
                        // else classList.push("expandLeaf");
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
        }
    });
}

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

// найти контейнер элемента
function getContainer(node_id) {
    return $("#tree-container__" + node_id);
}

// создать новый узел
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