import { combineReducers } from 'redux';
import { pageList, pageListHasError, pageListIsLoading } from '../components/pagelist/PageListReducer';
import { userLogin, userPassw, userName, userSession, userIsLoading, userErrorText } from "../components/login/LoginReducer";

// расположенные ниже будут доступны через state.*
export default combineReducers({
    pageList,
    pageListHasError,
    pageListIsLoading,

    userLogin,
    userPassw,
    userName,
    userSession,
    userIsLoading,
    userErrorText
});
