import {combineReducers} from "redux";
import MenuItems from './MenuItems';
import MainMenuItemActive from "./MainMenuItemActive";

// состояние всего приложения

const AllReducers = combineReducers({
    menuitems: MenuItems,                                 // список меню
    activeMainMenuItem: MainMenuItemActive                // текущая менюшка
});

export default AllReducers;