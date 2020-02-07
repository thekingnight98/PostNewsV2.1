import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        personalid: null,
        email: null,
        name: null,
    },
    mutations: {
        setPersonal(state, personalid) {
            state.personalid = personalid
        },
    },
    getters: {
        personalid: state => state.personalid,
    },
    actions: {},
    modules: {}
})