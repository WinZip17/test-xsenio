import React from 'react';
import {connect} from "react-redux";
import Table from "./Table";

const TableContainerData = (props) => {

    return (
        <table className='table table-hover'>
            <tbody>
            <tr className='thead-dark'>
                <th scope="col">#</th>
                <th scope="col">Название фирмы</th>
                <th scope="col">Сфера деятельности</th>
                <th scope="col">Последняя цена продажи</th>
                <th scope="col">Последний размер продажи</th>
                <th scope="col">Последнее обновление</th>
            </tr>
            </tbody>

            {props.pageSymbolInfoArr[props.page - 1].map((symbol) => <Table
                key={symbol.id} symbol={symbol}/>)}
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
