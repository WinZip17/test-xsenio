import {getSymbolInfoAC, getSymbolListAC} from "./actions";
import {API} from "../api";


export const getSymbolListThunkCreator = () => {
    return (dispatch) => {
        API.getSymbolList()
            .then(data => {
                dispatch(getSymbolListAC(data));
            })
    }
};

export const getSymbolInfoThunkCreator = (page, symbol) => {
    return (dispatch) => {
        API.getSymbolInfo(symbol)
            .then(data => {
                dispatch(getSymbolInfoAC(page, data));
            })
    }
};

