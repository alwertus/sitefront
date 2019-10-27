// функция создаёт действие
export const select = (menuitem) => {
    // alert("Checked" + menuitem.name);
    return {
        type: "MAINMENUITEM_SELECTED",
        payload: menuitem
    }
};