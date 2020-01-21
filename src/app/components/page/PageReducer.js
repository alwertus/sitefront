const defaultHTMLstring = '<h1 style="color:blue;">something</h1>';

export function pageDataNeedUpdate(state = false, action) {
    switch (action.type) {
        case "SET_PAGE_DATA_NEED_UPDATE":
            return action.newValue;
        default:
            return state;
    }
}

export function pageData(state = defaultHTMLstring, action) {
    switch (action.type) {
        case "SET_PAGE_DATA":
            return action.newValue;
        default:
            return state;
    }
}

export function pageTempData(state = "", action) {
    switch (action.type) {
        case "SET_PAGE_TEMP_DATA":
            return action.newValue;
        default:
            return state;
    }
}

export function pageEditMode(state = false, action) {
    switch (action.type) {
        case "SET_PAGE_EDIT_MODE":
            return action.newValue;
        default:
            return state;
    }
}
