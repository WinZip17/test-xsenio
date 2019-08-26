import * as axios from "axios";

const token = "pk_c5cfa1ad28fb4f7bbda943f661edf37b";

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
