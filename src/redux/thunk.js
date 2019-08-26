import {getSymbolInfoAC, getSymbolListAC, setLoadInfoAC} from "./actions";
import {API} from "../API";


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
                //если вернулся пустой массив от сервера без ошибки, то ничего не отображаем
                data.length === 0 ? dispatch(setLoadInfoAC("Sorry, connection problems, data is not fully loaded, try again later")): dispatch(getSymbolInfoAC(page, data));
            })
    }
};

