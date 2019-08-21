import React, {Component} from 'react';
import './App.css';
import {connect} from "react-redux";
import {getSymbolListThunkCreator} from "./redux/thunk";

class AppData extends Component {

    componentDidMount() {
        debugger
        this.props.getSymbolList();
    };

    render() {

        return (
            <div className="App">
<h1>jkhkjhkj</h1>
            </div>
        );
    }
}


let mapStateToProps = (state) => {
    return {
        state
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        getSymbolList: (symbolList) => {
            dispatch(getSymbolListThunkCreator(symbolList));
        }
    }
};



const App = connect(mapStateToProps, mapDispatchToProps)(AppData);
export default App;
