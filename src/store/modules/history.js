function check({id, name, artist}){
    return id > 0 && name && artist && name.length > 0 && artist.length > 0
}


const state = {
    loveList: [],
    playedList: []
}


const mutations = {
    updateLoveList: function(state, { id, name, artist }){
        if(!check({id, name, artist})) return
        if(!state.loveList.find(k => k.id == id)) state.loveList.unshift({ id, name, artist })
        if(state.loveList.length > 40) state.loveList.splice(40)
    },
    updatePlayedList: function(state, { id, name, artist }){
        if(!check({id, name, artist})) return
        if(!state.playedList.find(k => k.id == id)) state.playedList.unshift({ id, name, artist })
        if(state.playedList.length > 40) state.playedList.splice(40)
    },
    deleteLoveList: function(state, {ids: ids}){
        if(!Array.isArray(ids)) return
        state.loveList = state.loveList.filter(i => !ids.includes(i.id))
    },
    deletePlayedList: function(state, {ids: ids}){
        if(!Array.isArray(ids)) return
        state.playedList = state.playedList.filter(i => !ids.includes(i.id))
    }
}


const actions = {}


const getters = {
    getLoveList: state => state.loveList,
    getPlayedList: state => state.playedList
}


export default {
    state,
    mutations,
    actions,
    getters
}