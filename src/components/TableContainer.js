import React from 'react';
import {connect} from "react-redux";
import Table from "./Table";
import {Droppable} from "react-beautiful-dnd";
import "./TableContainer.css"

const TableContainerData = (props) => {
    return (
        <table className="table table-hover tableCorrect text-nowrap text-truncate">
            <thead>
            <tr className="thead-dark theadCorrect">
                <th scope="col">№</th>
                <th scope="col">Name</th>
                <th scope="col">Specificity</th>
                <th scope="col">Last sale price</th>
                <th scope="col">Last sale size</th>
                <th scope="col">Last update</th>
            </tr>
            </thead>
            <Droppable droppableId="unikumID">
                {provided => (
                    <tbody {...provided.droppableProps} ref={provided.innerRef}>
                    {props.pageSymbolInfoArr[props.page - 1].map((symbol, index) => <Table
                        key={symbol.id} symbol={symbol} index={index} id={symbol.id}/>)}
                    {provided.placeholder}
                    </tbody>
                )}
            </Droppable>
        </table>

    );

};


let mapStateToProps = (state) => {
    return {
        pageSymbolInfoArr: state.data.pageSymbolInfoArr,
        page: state.data.page
    }
};

const TableContainer = connect(mapStateToProps)(TableContainerData);
export default TableContainer;
