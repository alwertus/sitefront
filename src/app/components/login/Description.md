#### Login Info
| ok | action  | type  | store |
| :-------: | --- | --- | --- |
| + | changeUserLogin() | USER_SET_LOGIN | userLogin |
| + | changeUserPassw() | USER_SET_PASSW | userPassw |
| + | setUserName() | USER_SET_NAME | userName <br>_(save to localStorage)_ |
| + | setUserSession() | USER_SET_SESSION | userSession <br>_(save to localStorage)_ |
| + | signIn() | <hr> | <hr> |
| + | setUserLoading() | USER_IS_LOADING | userIsLoading |
|  | setErrorText() | USER_SET_ERROR_TEXT | userErrorText |
|  |  |  |  |

* USER_FETCH_DATA_SUCCESS

###### Store
* userErrorText

##### IncomingMsg
sessionString  
userName  
errorCode  
errorMsg
