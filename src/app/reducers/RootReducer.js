import { combineReducers } from 'redux';
import { pageList, pageListHasError, pageListIsLoading } from './PageList';

export default combineReducers({
    pageList,
    pageListHasError,
    pageListIsLoading
});
