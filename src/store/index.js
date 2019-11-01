import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    actions: {
        setModalCreateTable(context){
            context.commit('SET_MODAL_CREATE_TABLE');
        },
    },
    mutations: {
        SET_MODAL_CREATE_TABLE(state){
            state.isOpenModalCreateTable = !state.isOpenModalCreateTable;
        },
    },
    state: {
        isOpenModalCreateTable: false
    },
    getters: {
        getOpenModalCreateTable(state){
            return state.isOpenModalCreateTable;
        },
    }
})