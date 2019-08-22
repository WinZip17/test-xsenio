import React, {Component} from 'react';
import './App.css';
import {connect} from "react-redux";
import {getSymbolInfoThunkCreator, getSymbolListThunkCreator} from "./redux/thunk";
import TableContainer from "./components/TableContainer";
import {addArrSymbolPageAC, sortAC, updPageAC} from "./redux/actions";
import {DragDropContext} from "react-beautiful-dnd";

//импорт картинок для кнопок
import first from "./img/first.png"
import last from "./img/last.png"
import next from "./img/next.png"
import previous from "./img/previous.png"


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

    onDragEnd = (result) => {
        const {destination, source} = result;
        if (!destination) {
            return;
        }

        this.props.sort(source.index, destination.index);
    };



    render() {
        //пока не загрузиться первая страница значений дальше не грузиться
        if (!this.props.state.data.isReadyTableInfo) {
            return (
                <div className="container h-100">
                    <div className="row justify-content-center h-100">
                        <div className="spinner-border text-primary preloader" role="status"></div>
                    </div>
                </div>
                )

        }

            return (
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <div className="container text-center pt-1">

                        <h1 className="h1">A numbered table in which there are reports</h1>

                        <TableContainer/>

                        <div className="row justify-content-center">

                            <button className="btn btn-link btn-sm" onClick={() => {
                                this.props.updPage(1)
                            }}><img src={first} alt="first"/>
                            </button>

                            <button className="btn btn-link btn-sm" onClick={() => {
                                this.props.updPage(this.getPreviousPage())
                            }}><img src={previous} alt="previous"/>
                            </button>

                            <div>
                                <div className="m-1 currentPage btn btn-info btn-lg badge-pill">{this.props.state.data.page}</div>
                            </div>

                            <button className="btn btn-link btn-sm" onClick={() => {
                                this.props.updPage(this.getNextPage())
                            }}><img src={next} alt="next"/>
                            </button>

                            <button className="btn btn-link btn-sm" onClick={() => {
                                this.props.updPage(this.getLastPage())
                            }}><img src={last} alt="last"/>
                            </button>
                        </div>
                    </div>
                </DragDropContext>
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
        },
        sort (droppableIndexStart, droppableIndexEnd) {
            dispatch(sortAC(droppableIndexStart, droppableIndexEnd));
        }
    }
};


const App = connect(mapStateToProps, mapDispatchToProps)(AppData);
export default App;
