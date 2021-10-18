import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from "../utils/storage"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: getItem('user'),
        cachePages: ['LayOut']
    },
    mutations: {
        setUser(state, value) {
            state.user = value
            setItem('user', value)
        },
        addCachePage(state, pageName) {
            if (!state.cachePages.includes(pageName)) {
                state.cachePages.push(pageName)
            }
        },
        removeCachePage(state, pageName) {
            const index = state.cachePages.indexOf(pageName)
            if (index !== -1) {
                state.cachePages.splice(index, 1)
            }
        }
    },
    actions: {},
    modules: {}
})