$(document).ready(function(){
    refreshMenuItems();
});

$('#add-info').click(function () {
    $('.content-add-info-window').show(200);
});

$('#btn-cancel').click(function () {
    $('.content-add-info-window').hide(200);
    $('#text-title,#text-content').val('');
    $(".content-add-info-window-content-down-errormsg").hide();
});

// проверка на заполнение полей
$('#btn-ok').click(function () {
    if (($.trim($("#text-content").val())).length == 0 || ($.trim($("#text-title").val())).length == 0) {
        console.log("Заполнены не все поля!");
        // показываем сообщение об ошибке, затем устанавливаем событие при наборе текста, чтоб это сообщение скрыть
        $(".content-add-info-window-content-down-errormsg").show(100);
        $("#text-content, #text-title").keypress(function (e) {
            console.log("keypress");
            $(".content-add-info-window-content-down-errormsg").hide();
            // отключаем событие при первом вызове
            $("#text-content, #text-title").off('keypress');
        });
        return;
    }
    sendPageToServer();
    $('#btn-cancel').trigger('click');
    refreshMenuItems();
    console.log("refresh 0");
});



//-----------------------------

function sendPageToServer() {
    console.log('ajax на сервер добавление страницы');
    var data = {
        "operation" : "append",
        "title" : $("#text-title").val(),
        "page" : $("#text-content").val()
    };
    $.ajax({
        type: 'POST',
        data: data,
        url: 'InfoPageServlet',
        succes: function(serverData) {      // удачный запрос
            var response = serverData.serverInfo;
            console.log("Результат добавления записей: " + response);
        },
        error: function(e) {                // ошибка
            console.log("Ошибка обращения к серверу");

        }
    });
}

// обновление списка меню с сервера
// 1 2 5 0 3x15 4
function refreshMenuItems() {
    var data = {
        "operation" : "get_menu_items",
        "element" : "-"
    };
    var menu = $(".content-menu-list");

    console.log("refresh 1");
    menu.empty();
    console.log("refresh 2");
    $.ajax({
        type: "POST",
        data: data,
        url: 'InfoPageServlet',
        success: function(serverData) {      // удачный запрос
            var linkArr = serverData.serverInfo.split("~");
            linkArr.forEach(function(element) {
                console.log("refresh 3");
                var linkArr = element.split(":");
                if (linkArr[1] == null) {   // если это категория

                } else {                    // если это элемент
                    $("<li>", {
                        name: linkArr[0]
                    }).html(linkArr[1]).appendTo(menu);
                }

            });
            console.log("refresh 4");
            setOnClickElements();
        },
        error: function(e) {                // не очень удачный запрос
            menu.append("Ошибка получения списка меню");
        }
    });
    console.log("refresh 5");
}

// установка событий по клику на пункты меню
function setOnClickElements() {
    $(".content-menu-list li").click(function(element) {
        var elemName = element.target.getAttribute("name");
        var data = {
            "operation" : "get_html",
            "element" : elemName
        };

        $.ajax({
            type: "POST",                   // Метод передачи
            data: data,                     // Передаваемые данные в JSON - формате
            url: 'InfoPageServlet',         // Название сервлета
            success:function(serverData)    // Если запрос удачен
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
    });
}