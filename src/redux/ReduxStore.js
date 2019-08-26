import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from 'redux-thunk';
import DataReducer from "./dataReducer";

export let reducers = combineReducers({
    data: DataReducer,
});

let store = createStore(reducers,
    applyMiddleware(thunk));
window.store = store;

export default store;
