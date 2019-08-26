import {ADD_ARR_SYMBOL_PAGE, DRAG_HAPPEND, GET_SYMBOL_INFO, GET_SYMBOL_LIST, SET_LOAD_INFO, UPD_PAGE} from "./actions";

let initialState = {
    symbolList: {},
    isReadyTableInfo: false,
    page: 1,
    lastFormedPages: 0,
    pageSymbolInfoArr: [],
    loadInfo: "Sorry, connection problems, data is not fully loaded, try again later",
    isFullReady: false
};

const DataReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_SYMBOL_LIST:
            return {...state, symbolList: action.symbolList};

        case SET_LOAD_INFO:
            return {...state, loadInfo: action.loadInfo};

        case ADD_ARR_SYMBOL_PAGE:
            let symbolPage = action.symbolPage;
            let pageSymbolInfoArr = state.pageSymbolInfoArr;
            pageSymbolInfoArr[action.page-1] = symbolPage;
            return {...state, pageSymbolInfoArr: pageSymbolInfoArr, page: action.page, isReadyTableInfo: true, lastFormedPages : action.page};

        case GET_SYMBOL_INFO:
            let numberPage = action.page -1;
            let updArrSymbol = action.symbolInfo;
            let oldArr = state.pageSymbolInfoArr;
            let newArr = oldArr[numberPage];
            for (let i = 0; i < 10; i++) {
                newArr[i].sector = updArrSymbol[i].sector;
                newArr[i].lastSalePrice = updArrSymbol[i].lastSalePrice;
                newArr[i].lastSaleSize = updArrSymbol[i].lastSaleSize;
                newArr[i].lastUpdated = updArrSymbol[i].lastUpdated;
            }
            oldArr[numberPage] = newArr;

            return {...state, pageSymbolInfoArr : oldArr, loadInfo: "", isFullReady : true };

        case UPD_PAGE:
            if (state.page === action.page) {
                return {...state}
            }
            return {...state, page: action.page, isReadyTableInfo: false, isFullReady : false};

        case DRAG_HAPPEND:
            const correctArr = (_arr, _param) => {
                _arr[_param[1]] = _arr.splice(_param[0],1, _arr[_param[1]])[0]
                return _arr
            };
            let start = action.start;
            let end = action.end;
            if (start === end) {return state}
            let nonCorrectArr = state.pageSymbolInfoArr;
            let newcorrectArr = correctArr(nonCorrectArr[state.page-1], [start, end]);
            let result = state.pageSymbolInfoArr;
            result[state.page-1] = newcorrectArr;
            return {...state, pageSymbolInfoArr: result};

        default:
            return state;
    }
};


export default DataReducer;