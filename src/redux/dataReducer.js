import {GET_SYMBOL_LIST} from "./actions";




let initialState = {
    symbolList: {},
    isVisible: false
};

const SingUpUsers = (state = initialState, action) => {
    switch (action.type) {
        case GET_SYMBOL_LIST:
            return {...state, symbolList: action.symbolList};
        default:
            return state;
    }
};




//
// export const getTokenThunkCreator = () => {
//     return (dispatch) => {
//         API.getToken()
//             .then(data => {
//                 dispatch(setTokenAC(data));
//             })
//     }
// };

// export const getPositionThunkCreator = () => {
//     return (dispatch) => {
//         API.getPositions()
//             .then(data => {
//                 dispatch(showPositionAC(data));
//             });
//     }
// };


export default SingUpUsers;