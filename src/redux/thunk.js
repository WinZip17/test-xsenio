import {getSymbolListAC} from "./actions";
import {API} from "../api";


export const getSymbolListThunkCreator = () => {
    return (dispatch) => {
        API.getSymbolList()
            .then(data => {
                dispatch(getSymbolListAC(data));
            })
    }
};