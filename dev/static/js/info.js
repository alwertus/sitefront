/*newNode("item1", "item 1", "isRoot").appendTo(getContainer("root"));
newNode("item1-1", "item 1.1").appendTo(getContainer("item1"));
newNode("item1-1-1", "item 1.1.1", "isLast").appendTo(getContainer("item1-1"));
newNode("item1-2", "item 1.2", "isLast").appendTo(getContainer("item1"));
newNode("item2", "item 2", "isRoot").appendTo(getContainer("root"));
newNode("item2-1", "item 2.1", "isLast").appendTo(getContainer("item2"));
newNode("item3", "item 3", "isRoot isLast").appendTo(getContainer("root"));
newNode("item3-1", "item 3.1", "isLast").appendTo(getContainer("item3"));*/

$(document).ready(function(){
    getContainer("0").empty();
    refreshTreeRecords("0");

});

$('#add-info').click(function () {
});

// обновить ветку с сервера
function refreshTreeRecords(appendToId) {
    $.ajax({
        type: 'POST',
        data: {
            'operation' : 'get_branch',
            'element' : appendToId
        },
        url: 'InfoPageServlet',
        success: function(serverData) {
            getContainer(appendToId).empty();
            var recordCount = serverData["serverInfo"].split(":")[1];
            for (let i = 0; i < recordCount; i++) {
                var classList = [];
                if (appendToId == "0") classList.push("isRoot");
                if (serverData["child_count" + i] == "0") classList.push("isLast");
                newNode(serverData['row_id' + i], serverData['title' + i], classList.join(" ")).appendTo(getContainer(appendToId));
            }
        }
    });
}

// свернуть/развернуть дерево
$(".tree").click(function (event) {
    event = event || window.event;                                          // для кроссбраузерности
    var clickedElement = $(event.target || event.srcElement);

    var parentElement = clickedElement.parent();
    if(clickedElement.hasClass("tree-expand") && !parentElement.hasClass("isLast")) {
        if (parentElement.hasClass("expandOpen"))
            parentElement.removeClass("expandOpen").addClass("expandClosed");
        else {
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
function newNode(node_id, node_text, node_class="") {
    var node = $("<li>", {
        id: node_id,
        class: "tree-node expandClosed" +  (node_class.length > 0 ? " " + node_class : "")
    });
    node.append($("<div>",{ class: "tree-expand" }));
    node.append($("<div>", {class: "tree-content"})
        .append($("<input>",{
                name: "tree-radio",
                type: "radio",
                class: "tree-radio",
                id: "tree-radio__" + node_id
            }).change(function() {
                refreshPage(node_id);   // показываем страницу
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