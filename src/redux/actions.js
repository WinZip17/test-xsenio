export const GET_SYMBOL_LIST = 'GET_SYMBOL_LIST';
export const GET_SYMBOL_INFO = 'GET_SYMBOL_INFO';
export const ADD_ARR_SYMBOL_PAGE = 'ADD_ARR_SYMBOL_PAGE';
export const UPD_PAGE = 'UPD_PAGE';


export const getSymbolListAC = (symbolList) => ({type: GET_SYMBOL_LIST, symbolList: symbolList});
export const getSymbolInfoAC = (page, data) => ({type: GET_SYMBOL_INFO,  page: page, symbolInfo: data});
export const addArrSymbolPageAC = (page, data) => ({type: ADD_ARR_SYMBOL_PAGE, page: page, symbolPage: data});
export const updPageAC = (page) => ({type: UPD_PAGE, page: page});