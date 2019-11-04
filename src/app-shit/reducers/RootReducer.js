import { combineReducers } from 'redux';
import User from "./User"
import { pageListHasError, pageListIsLoading, pageList } from "./PageList";

export default combineReducers({
    User,
    pageListHasError,
    pageListIsLoading,
    pageList
});
