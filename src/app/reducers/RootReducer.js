import { combineReducers } from 'redux';
import { pageList, pageListHasError, pageListIsLoading } from './PageListReducer';

export default combineReducers({
    pageList,
    pageListHasError,
    pageListIsLoading
});
