import { combineReducers } from 'redux';
import { pageList, pageListHasError, pageListIsLoading, pageListNeedUpdate } from '../components/pagelist/PageListReducer';
import { userLogin, userPassw, userName, userSession, userIsLoading, userErrorText } from "../components/login/LoginReducer";
import { treeData } from "../components/tree/TreeReducer";

// набор "чистых функций"
// расположенные ниже будут доступны через state.*
export default combineReducers({
    pageList,
    pageListHasError,
    pageListIsLoading,
    pageListNeedUpdate,

    userLogin,
    userPassw,
    userName,
    userSession,
    userIsLoading,
    userErrorText,

    treeData
});
