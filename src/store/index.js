import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);
const urlForTable = 'http://www.filltext.com/';
export default new Vuex.Store({
    actions: {
        cleanTableByKey(context, key) {
            context.commit('CLEAN_TABLE_BY_KEY', key);
        },
        deleteTableByKey(context, key) {
            context.commit('DELETE_TABLE_BY_KEY', key);
        },
        deleteError(context) {
            context.commit('DELETE_ERROR');
        },
        setModalCreateTable(context){
            context.commit('SET_MODAL_CREATE_TABLE');
        },
        setModalRecoverTable(context){
            context.commit('SET_MODAL_RECOVER_TABLE');
        },
        recoveryDataTable(context, payload) {
            context.commit('ADD_DATA_TABLE', payload);
            context.commit('SET_MODAL_RECOVER_TABLE');
        },
        async addDataTables(context, payload) {
            context.commit('SET_MODAL_CREATE_TABLE');
            context.commit('TOGGLE_LOADING');
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
                    context.commit('ADD_ERROR', 'Ошибка получения данных');
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
        SET_MODAL_RECOVER_TABLE(state){
            state.isOpenModalRecoverTable = !state.isOpenModalRecoverTable;
        },
        TOGGLE_LOADING(state){
            state.isLoading = !state.isLoading;
        },
        ADD_DATA_TABLE(state, tableData) {
            state.arTablesData.push(tableData);
        },
        DELETE_TABLE_BY_KEY(state, key) {
            state.arTablesData.splice(key, 1)
        },
        CLEAN_TABLE_BY_KEY(state, key) {
            state.arTablesData[key].rows = []
        },
        ADD_ERROR(state, textError) {
            state.error = textError;
        },
        DELETE_ERROR(state) {
            state.error = '';
        }
    },
    state: {
        isOpenModalCreateTable: false,
        isOpenModalRecoverTable: false,
        arTablesData: [],
        isLoading: false,
        error: ''
    },
    getters: {
        getOpenModalCreateTable(state){
            return state.isOpenModalCreateTable;
        },
        getOpenModalRecoverTable(state){
            return state.isOpenModalRecoverTable;
        },
        getLoading(state) {
            return state.isLoading;
        },
        getError(state) {
            return state.error;
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