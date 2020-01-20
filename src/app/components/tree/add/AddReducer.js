export function treeAddElement_Title (state = "", action) {
    switch (action.type) {
        case "TREE_ADD_TITLE_CHANGE":
            return action.newValue;
            default: return state;
    }
}