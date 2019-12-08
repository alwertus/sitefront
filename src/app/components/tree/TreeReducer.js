const defaultTreeData = [
    { id: "i0", title: "root0", expanded: true, children: [
            { id: "i00", title: "Chicken11", expanded: false, children: [
                { id: "i000", title: "Egg0" }] },
            { id: "i01", title: "Chicken2", expanded: true, children: [
                { id: "i010", title: "Egg1" },
                { id: "i011", title: "Egg2" },
                { id: "i012", title: "Egg3" }]
            }]
    },
    { id: "i1", title: "root1", expanded: true }
];

// получаем структуру каталогов
export function treeData(state = defaultTreeData, action) {
    switch (action.type) {
        case "TREE_SET_ITEMS":
            return action.items.items;
        case "TREE_CHANGE_EXPANDED":
            return changeChildsExpand(state, action.id, action.newValue);
        default:
            return state;
    }
}

function changeChildsExpand(arrChild, id, newValue) {
    if (arrChild === undefined) return null;

    return arrChild.map(function (item, index) {

        if (item.id === id) item.expanded = newValue;
        if (item.children !== undefined)
            item.children = changeChildsExpand(item.children, id, newValue);

        return item;
        }
    );
}

// id активной страницы
export function treeActivePage(state = "", action) {
    switch (action.type) {
        case "TREE_SET_ACTIVEPAGE":
            return null;
        default:
            return state;
    }
}
