import * as axios from "axios";


const token = "?token=pk_c8045499571c4a0b8f93df2a8b561bf4";

const instance = axios.create({
    baseURL: 'https://cloud.iexapis.com/'
});


export const API = {

    getSymbolList() {
        return instance.get(`stable/ref-data/symbols` + token)
            .then(response => {
                debugger
                return response.data;
            })
    },
    getUserById(id) {
        return instance.get(`users/${id}`)
            .then(response => {
                return response.data;
            })
    },
    getPositions() {
        return instance.get(`positions`)
            .then(response => {
                return response.data;
            })
    },
    getToken() {
        return instance.get(`token`)
            .then(response => {
                return response.data.token;
            })
    },
    postUsers() {



    }
};
