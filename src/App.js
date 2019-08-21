import React, {Component} from 'react';
import './App.css';
import {connect} from "react-redux";
import {getSymbolInfoThunkCreator, getSymbolListThunkCreator} from "./redux/thunk";
import TableContainer from "./components/TableContainer";
import {addArrSymbolPageAC, updPageAC} from "./redux/actions";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";




class AppData extends Component {

    componentDidMount() {
        //загружаем список всех значений
        this.props.getSymbolList();
    };

    componentDidUpdate() {
        //после загрузки списка всех значений компонента обновится и можно загрузить первую страницу
        if (this.props.state.data.symbolList.length > 0 && this.props.state.data.lastFormedPages !== this.props.state.data.page ) {
            //Передаем в стейт информацию которую можно взять из уже загруженного (со списка всех значений)
            this.getNameSymbols(this.props.state.data.page,this.props.state.data.symbolList);
            //дозагрузки нехватающей информации по каждой позиции отдельно
            this.props.getSymbolsInfo(this.props.state.data.page, this.getNameArr());
        }
    }



    //добавление новой информации в существующую (которая была дозагруженна)
    getNameSymbols (page, data) {
        let startElement = page * 10 - 10;
        let nameSymbolsArr = [];
        for (let i = startElement; i < startElement + 10; i++) {
            data[i].id = i;
            data[i].logo = "";
            nameSymbolsArr.push(data[i]);
        };
        this.props.addArrSymbolPage(page, nameSymbolsArr)
    }

    //получить массив из фирм текущей страницы для запроса остальных данных
    getNameArr () {
        let symbolCurrentPage = this.props.state.data.pageSymbolInfoArr[this.props.state.data.page-1];
        let symbolHeadline = symbolCurrentPage.map((symbol) => {
            return symbol.symbol
        });
        return symbolHeadline
    }

    //определяет последнюю страницу для кнопки
    getLastPage () {
        let lastPage = this.props.state.data.symbolList.length / 10 -1;
        return Number(lastPage.toFixed(0));
    }

    //Определяет следующую страницу
    getNextPage () {
        let lastPage = this.getLastPage ();
        let nextPage = this.props.state.data.page + 1;
        let result = lastPage <= nextPage ? lastPage : nextPage;
        return result;
    }

    //Определяет предыдущую страницу
    getPreviousPage () {
        let previousPage = this.props.state.data.page - 1;
        let result = previousPage < 1 ? 1 : previousPage;
        return result;
    }


    render() {
        //пока не загрузиться первая страница значений дальше не грузиться
        if (!this.props.state.data.isReadyTableInfo) {
            return <div></div>
        }

            return (
            <div className="container text-center" >

                    <h1>Нумерованая таблица, в которой есть отчеты акий</h1>


                 <TableContainer />

                <div className="row justify-content-center">
                    <button className="btn btn-link btn-sm" onClick={ () => {this.props.updPage(1)}} >Первая страница</button>
                    <button className="btn btn-link btn-sm" onClick={ () => {this.props.updPage(this.getPreviousPage())}}>Предыдущая страница</button>
                    <div><div className="m-1">{this.props.state.data.page}</div></div>
                    <button className="btn btn-link btn-sm" onClick={ () => {this.props.updPage(this.getNextPage())}}>Следущая страница</button>
                    <button className="btn btn-link btn-sm" onClick={ () => {this.props.updPage(this.getLastPage())}} >Последняя страница</button>
                </div>
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
        },
        getSymbolsInfo: (page, symbol) => {
            dispatch(getSymbolInfoThunkCreator(page, symbol));
        },
        addArrSymbolPage(page, data) {
            dispatch(addArrSymbolPageAC(page, data));
        },
        updPage(page) {
            dispatch(updPageAC(page));
        }
    }
};


const App = connect(mapStateToProps, mapDispatchToProps)(AppData);
export default App;
