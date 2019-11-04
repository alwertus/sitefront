export function pageListHasError(state = false, action) {
    switch (action.type) {
        case 'PAGELIST_HAS_ERROR':
            return action.hasError;

        default:
            return state;
    }
}
export function pageListIsLoading(state = false, action) {
    switch (action.type) {
        case 'PAGELIST_IS_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}

export function pageList(state = [], action) {
    switch (action.type) {
        case 'PAGELIST_FETCH_DATA_SUCCESS':
            if (action.items.errorCode !== "0")
                pageListHasError();
            return action.items.items;
        default:
            return state;
    }
}
