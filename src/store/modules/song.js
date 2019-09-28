const defaultList = () => ({
    id: '',
    name: '',
    artist: ''
})


const state = {
    list: defaultList()
}


const mutations = {
    updateMusicInfo: function(state, { id, name, artist }){
        state.list = { id, name, artist }
    }
}


const actions = {}


const getters = {
    getSongInfo: state => state.list
}


export default {
    state,
    mutations,
    actions,
    getters
}