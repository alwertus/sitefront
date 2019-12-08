export function setNewTree (newValue)          { return { type: "TREE_SET_ITEMS",       newValue: newValue } }
export function setTreeExpanded (id, newValue) { return { type: "TREE_CHANGE_EXPANDED", newValue: newValue, id: id } }
export function setTreeActivePage (newValue)   { return { type: "TREE_SET_ACTIVEPAGE",  newValue: newValue } }
