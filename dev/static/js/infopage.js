function setOnClickElements() {
    $(".content-menu-list li").click(function(element) {
        var elemName = element.target.getAttribute("name");
        var data = {"element" : elemName};

        $.ajax({
            type: "POST",//Метод передачи
            data: data,//Передаваемые данные в JSON - формате
            url: 'InfoPageServlet',//Название сервлета
            success:function(serverData)//Если запрос удачен
            {
                //console.log("ОТВЕТ ОТ СЕРВЕРА: УДАЧА (" + serverData.serverInfo + ")");
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
$(document).ready(function(){
    var data = {"element" : "GET_MENU_ITEMS"};
    var menu = $(".content-menu-list");

    menu.empty();
    $.ajax({
        type: "POST",
        data: data,
        url: 'InfoPageServlet',
        success: function(serverData) {      // удачный запрос
            var linkArr = serverData.serverInfo.split("~");
            linkArr.forEach(function(element) {
                var linkArr = element.split(":");
                if (linkArr[1] == null) {   // если это категория

                } else {    // если это элемент
                    $("<li>", {
                        name: linkArr[0]
                    }).html(linkArr[1]).appendTo(menu);
                }

            });
            setOnClickElements();
        },
        error: function(e) {                // не очень удачный запрос
            menu.append("Ошибка получения списка меню");
        }
    });
});
$('#add-info').click(function () {
    $('.content-add-info-window').show(200);
});
$('#btn-cancel').click(function () {
    $('.content-add-info-window').hide(200);
    $('#text-title,#text-content').val('');
});
$('#btn-ok').click(function () {
    console.log('ajax на сервер добавление страницы');
    $('#btn-cancel').trigger('click');
});