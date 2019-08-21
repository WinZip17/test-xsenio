import React from 'react';
import {connect} from "react-redux";
import Table from "./Table";
import {Droppable} from "react-beautiful-dnd";

const TableContainerData = (props) => {

    return (
        <table className='table table-hover'>
            <thead>
            <tr className='thead-dark'>
                <th scope="col">№</th>
                <th scope="col">Название фирмы</th>
                <th scope="col">Сфера деятельности</th>
                <th scope="col">Последняя цена продажи</th>
                <th scope="col">Последний размер продажи</th>
                <th scope="col">Последнее обновление</th>
            </tr>
            </thead>
            <Droppable droppableId={String("ddfsdad")}>
                {provided => (
                    <tbody {...provided.droppableProps} ref={provided.innerRef}>
                    {props.pageSymbolInfoArr[props.page - 1].map((symbol, index) => <Table
                        key={symbol.id} symbol={symbol} index={index} id={symbol.id} />)}
                    {provided.placeholder}
                    </tbody>
                )}
            </Droppable>
        </table>

    );

}


let mapStateToProps = (state) => {
    return {
        pageSymbolInfoArr: state.data.pageSymbolInfoArr,
        page: state.data.page
    }
};

const TableContainer = connect(mapStateToProps)(TableContainerData);
export default TableContainer;
