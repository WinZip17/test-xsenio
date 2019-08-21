import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from 'redux-thunk';
import dataReducer from "./dataReducer";

export let reducers = combineReducers({
    data: dataReducer,
});

let store = createStore(reducers,
    applyMiddleware(thunk));

window.store = store;

export default store;
