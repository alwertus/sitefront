export function treeData(state = [
        { title: "Chicken1", expanded: true, children: [{ title: "Egg0" }] },
        { title: "Chicken2", expanded: true, children: [{ title: "Egg1" },{ title: "Egg2" }] }
    ], action) {
        switch (action.type) {
            case "TREE_SET_ITEMS":
                /*if (action.items.errorCode !== "0")
                    pageListHasError();*/
                return action.items.items;
            default:
                return state;
        }
}