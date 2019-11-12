import { combineReducers } from 'redux';
import { pageList, pageListHasError, pageListIsLoading } from './PageListReducer';

// расположенные ниже будут доступны через state.*
export default combineReducers({
    pageList,
    pageListHasError,
    pageListIsLoading,
    userName,
    userSessionString
});
