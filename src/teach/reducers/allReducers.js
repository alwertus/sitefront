import {combineReducers} from "redux";
import state1 from './state1';

// перечисляем все редусеры
const allReducers = combineReducers({
    state1: state1
});

export default allReducers;