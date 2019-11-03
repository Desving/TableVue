import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);
const urlForTable = 'http://www.filltext.com/';
export default new Vuex.Store({
    actions: {
        setModalCreateTable(context){
            context.commit('SET_MODAL_CREATE_TABLE');
        },
        async addDataTables(context, payload) {
            context.commit('SET_MODAL_CREATE_TABLE');
            context.commit('TOGGLE_LOADING');
            console.log(payload, 'payload');
            let params = {
                "rows": payload.rowsCount,
                "id": "{number|1000}",
                "firstName": "{firstName}",
                "lastName": "{lastName}",
                "email": "{email}",
                "phone": "{phone|%28xxx%29xxx-xx-xx}",
                "adress": "{addressObject}",
                "description": "{lorem|32}",
            };

            await axios.get(urlForTable, {
                params
            })
                .then(function (response) {
                    payload.rows =  response.data;
                    context.commit('ADD_DATA_TABLE', payload);
                })
                .catch(function (error) {
                    console.log(error);
                })
                .finally(function () {
                    context.commit('TOGGLE_LOADING');
                });
        }
    },
    mutations: {
        SET_MODAL_CREATE_TABLE(state){
            state.isOpenModalCreateTable = !state.isOpenModalCreateTable;
        },
        TOGGLE_LOADING(state){
            state.isLoading = !state.isLoading;
        },
        ADD_DATA_TABLE(state, tableData) {
            state.arTablesData.push(tableData);
        }
    },
    state: {
        isOpenModalCreateTable: false,
        arTablesData: [],
        isLoading: false,
    },
    getters: {
        getOpenModalCreateTable(state){
            return state.isOpenModalCreateTable;
        },
        getLoading(state) {
            return state.isLoading;
        },
        getArDataTables(state){
            state.arTablesData.forEach((tableData) => {
                tableData.rows.forEach((row) => {
                    if ('adress' in row) {
                        if (row.adress instanceof Object) {
                            let strAdress = '';
                            strAdress += ' zip: ' + row.adress.zip;
                            strAdress += ' state: ' + row.adress.state;
                            strAdress += ' city: ' + row.adress.city;
                            strAdress += ' street: ' + row.adress.streetAddress;
                            row.adress = strAdress;
                        }
                    }
                })
            });
            return state.arTablesData;
        },
    }
})