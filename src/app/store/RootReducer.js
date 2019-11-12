import { combineReducers } from 'redux';
import { pageList, pageListHasError, pageListIsLoading } from '../components/pagelist/PageListReducer';
import { userSessionString, userLogin } from "../components/login/LoginReducer";

// расположенные ниже будут доступны через state.*
export default combineReducers({
    pageList,
    pageListHasError,
    pageListIsLoading,

    userSessionString,
    userLogin
});
