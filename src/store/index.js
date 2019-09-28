import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)


import createPersistedState from 'vuex-persistedstate'


import musicList from './modules/music-list'
import song from './modules/song'
import history from './modules/history'


export default new Vuex.Store({
    modules: { musicList, song, history }, 
    plugins: [createPersistedState()]
})