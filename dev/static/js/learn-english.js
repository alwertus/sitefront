newNode("item1", "item 1", "isRoot").appendTo(getElement("root"));
    newNode("item1-1", "item 1.1").appendTo(getElement("item1"));
        newNode("item1-1-1", "item 1.1.1", "isLast").appendTo(getElement("item1-1"));
    newNode("item1-2", "item 1.2", "isLast").appendTo(getElement("item1"));
newNode("item2", "item 2", "isRoot").appendTo(getElement("root"));
    newNode("item2-1", "item 2.1", "isLast").appendTo(getElement("item2"));
newNode("item3", "item 3", "isRoot isLast").appendTo(getElement("root"));
    newNode("item3-1", "item 3.1", "isLast").appendTo(getElement("item3"));

// установить событие onClick на дереве
$(".tree").click(function (event) {
    event = event || window.event;                                          // для кроссбраузерности
    var clickedElement = $(event.target || event.srcElement);

    var parentElement = clickedElement.parent();
    if(clickedElement.hasClass("tree-expand") && !parentElement.hasClass("isLast")) {


        if (parentElement.hasClass("expandOpen")) {
            parentElement.removeClass("expandOpen").addClass("expandClosed");
        }
        else {
            parentElement.removeClass("expandClosed").addClass("expandOpen");
        }
    }

});

// найти контейнер элемента
function getElement(node_id) {
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
        }).html(""))
        .append($("<label>", {
            class: "tree-content-label",
            for: "tree-radio__" + node_id
        }).html(node_text)));
    node.append($("<ul>", { class: "tree-container", id: "tree-container__" + node_id}));
    return node;
}