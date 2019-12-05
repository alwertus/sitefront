const defaultTreeData = [
    { id: "0", title: "root0", expanded: true, children: [
            { id: "00", title: "Chicken11", expanded: false, children: [
                { id: "000", title: "Egg0" }] },
            { id: "01", title: "Chicken2", expanded: true, children: [
                { id: "010", title: "Egg1" },
                { id: "011", title: "Egg2" },
                { id: "012", title: "Egg3" }]
            }]
    },
    { id: "1", title: "root1", expanded: true }
];

export function treeData(state = defaultTreeData, action) {
    switch (action.type) {
        case "TREE_SET_ITEMS":
            /*if (action.items.errorCode !== "0")
                pageListHasError();*/
            return action.items.items;
        default:
            return state;
    }
}