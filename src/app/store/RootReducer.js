import { combineReducers } from 'redux';
import { pageList, pageListHasError, pageListIsLoading, pageListNeedUpdate } from '../components/pagelist/PageListReducer';
import { userLogin, userPassw, userName, userSession, userIsLoading, userErrorText } from "../components/login/LoginReducer";
import { treeData, treeActivePage, treeNeedUpdate, treeAddElement_ShowDialog } from "../components/tree/TreeReducer";
import { buttonString1, buttonString2 } from "../components/button/ButtonReducer";
import { treeAddElement_Title } from "../components/tree/add/AddReducer";
import { pageData, pageDataNeedUpdate } from "../components/page/PageReducer";


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

    treeData,
    treeActivePage,
    treeNeedUpdate,
    treeAddElement_ShowDialog,

    buttonString1,
    buttonString2,

    treeAddElement_Title,

    pageData,
    pageDataNeedUpdate
});
