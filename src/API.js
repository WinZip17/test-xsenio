import * as axios from "axios";

const token = "";

const instance = axios.create({
    baseURL: 'https://cloud.iexapis.com/',
});

export const API = {
    getSymbolList() {
        return instance.get(`stable/ref-data/symbols?token=${token}`)
            .then(response => {
                return response.data;
            })
    },
    getSymbolInfo(symbol) {
        return instance.get(`stable/tops?token=${token}&symbols=${symbol}`)
            .then(response => {
                return response.data;
            })
    }
};
