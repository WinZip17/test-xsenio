import * as axios from "axios";

const token = "?token=";

const instance = axios.create({
    baseURL: 'https://cloud.iexapis.com/'
});

export const API = {
    getSymbolList() {
        return instance.get(`stable/ref-data/symbols` + token)
            .then(response => {
                return response.data;
            })
    },
    getSymbolInfo(symbol) {
        return instance.get(`https://cloud.iexapis.com/stable/tops`+token+`&symbols=${symbol}`)
            .then(response => {

                return response.data;
            })
    }
};
