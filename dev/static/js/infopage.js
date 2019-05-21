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
});

//-----------------------------

function sendPageToServer() {
    $.ajax({
        type: 'POST',
        data: {
            "operation" : "append",
            "title" : $("#text-title").val(),
            "page" : $("#text-content").val()
        },
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
function refreshMenuItems() {
    $.ajax({
        type: "POST",
        data: {
            "operation" : "get_menu_items",
            "element" : "-"
        },
        url: 'InfoPageServlet',
        success: function(serverData) {      // удачный запрос

            var menu = $(".content-menu-list");
            var recordCount = serverData["serverInfo"].split(":")[1];

            for (let i = 0; i < recordCount; i++) {
                if (serverData["category_flag" + i] == "1")
                    $("<p>", {class: "ul-title"}).html(serverData["title" + i]).appendTo(
                    $("<ul>", {
                        id: serverData["title" + i]
                    }).appendTo(menu));
            }
            for (let i = 0; i <recordCount ; i++) {
                if (serverData["category_flag" + i] == "0") {
                    var parent = serverData["parent" + i];
                    $("<li>", {
                        name: serverData["title" + i]
                    }).html(serverData["link_text" + i]).appendTo(parent.length > 0 ? $("#" + parent) : menu);
                }
            }

            setOnClickElements();
        },
        error: function(e) {                // не очень удачный запрос
            menu.append("Ошибка получения списка меню");
        }
    });
}

// установка событий по клику на пункты меню
function setOnClickElements() {
    $(".ul-title").click(function(element) {
        if (element.target.parentElement.hasAttribute('class'))
            element.target.parentElement.removeAttribute("class");
        else
            element.target.parentElement.className="hide";
    });
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