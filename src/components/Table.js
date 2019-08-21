import React from 'react';

const formatDate = (data) => {
    let date = new Date(data);

    let dd = date.getDate();
    if (dd < 10) dd = '0' + dd;

    let mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;

    let yy = date.getFullYear() % 100;
    if (yy < 10) yy = '0' + yy;

    return dd + '.' + mm + '.' + yy;
};


const Table = (props) => {

    return (
        <tbody>
        <tr>
            <th scope="col">{props.symbol.id+1}</th>
            <th scope="col">{props.symbol.name}</th>
            <th scope="col">{props.symbol.sector}</th>
            <th scope="col">{props.symbol.lastSalePrice}</th>
            <th scope="col">{props.symbol.lastSaleSize}</th>
            <th scope="col">{formatDate(props.symbol.lastUpdated)}</th>
        </tr>
        </tbody>
    )
}

export default Table;