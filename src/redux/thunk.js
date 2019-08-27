import {getSymbolInfoAC, getSymbolListAC, setLoadInfoAC} from "./actions";
import {API} from "../API";

//запрос общего списка Symbol
export const getSymbolListThunkCreator = () => {
    return (dispatch) => {
        API.getSymbolList()
            .then(data => {
                dispatch(getSymbolListAC(data));
            })
    }
};

//дозагрузка нехватающей информации на странице
export const getSymbolInfoThunkCreator = (page, symbol) => {
    return (dispatch) => {
        API.getSymbolInfo(symbol)
            .then(data => {
                //если вернулся пустой массив от сервера, то ничего не отображаем
                data.length === 0 ? dispatch(setLoadInfoAC("Sorry, connection problems, data is not fully loaded, try again later")): dispatch(getSymbolInfoAC(page, data));
            })
    }
};

