$(".content-menu-list li").click(function(element) {
    var elemName = element.target.getAttribute("name");
    var data = {"element" : elemName};

    $.ajax({
        type: "POST",//Метод передачи
        data: data,//Передаваемые данные в JSON - формате
        url: 'AuthServlet',//Название сервлета
        success:function(serverData)//Если запрос удачен
        {
            console.log("ОТВЕТ ОТ СЕРВЕРА: УДАЧА (" + serverData.serverInfo + ")");
            $(".content-info").hide(200);
            $(".content-info").html(serverData.serverInfo);
            $(".content-info").show(200);

            // $("#auth-info").css({"background-color":serverData.backgroundColor, "height": "50px", "color":"white"});
            // $("#auth-info").html(serverData.serverInfo);
        },
        error: function(e)//Если запрос не удачен
        {
            console.log("ОТВЕТ ОТ СЕРВЕРА: ОШИБКА");
            $(".content-info").html("Нет ответа от сервера, либо инфа не найдена");
            // $("#auth-info").css({"background-color":"#CC6666", "height": "50px", "color":"white"});
            // $("#auth-info").html("Запрос не удался!");
        }
    });

});