const defaultList = () => ({
    pic: '',
    title: '',
    path: '',
    type: ''
})


const state = {
    list: defaultList()
}


const mutations = {
    updateMusicList: function(state, { pic, title, path, type }){
        state.list = { pic, title, path, type }
    }
}


const actions = {}


const getters = {
    getListInfo: state => state.list
}


export default {
    state,
    mutations,
    actions,
    getters
}