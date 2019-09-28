<template>
    <div class="singer-box theme2">
        <router-view></router-view>
        <div class="loading" v-if="list.length == 0">
            <img width="24" height="24" :src="loading">
        </div>
        <div class="list-wrapper" ref="listWrapper">
            <div class="list-content">
                <div class="singer-head">热门</div>
                <div class="singer" v-for="(item, i) in list" :key="i" @click="gotoDetail(item)">
                    <span class="singer-icon"><img width="100%" height="100%" v-lazy="item.pic"/></span>
                    <span class="singer-name">{{item.name}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>


import loading from '../common/loading'
import { GET } from '../api'
import initScroll from '../common/scroll'
export default {
    data: () => ({
        list: [],
        loading: loading.load
    }),
    methods:{
        loadList(){
            GET('/top/artists').then(res => {
                this.list = res.artists.map(({name, picUrl, id}) => {
                    return {name, pic: picUrl + '?param=100y100', id, picUrl}
                })
                initScroll(this.$refs.listWrapper, {bounce: true})
            })
        },
        gotoDetail(item){
            this.$store.commit('updateMusicList', { pic: item.picUrl, title: item.name, path: '/artists', type: 'singer' })
            this.$nextTick(() => {
                this.$router.push({name: 'singerDetail', query: {id: item.id}})
            })
        }
    },
    mounted(){
        this.loadList()
    }
}
</script>
<style scoped>
.singer-box{
    position: fixed;
    top: 95px;
    bottom: 0;
    overflow: hidden;
    width: 100%;
}
.list-wrapper{
    width: 100%;
    height: 100%;
}
.list-content{
    width: 100%;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
}
.singer-head{
    height: 30px;
    width: 100%;
    line-height: 30px;
    padding-left: 30px;
    font-size: 12px;
    background-color: #333;
}
.singer{
    flex: 0 0 60px;
    width: 100%;
    padding: 5px 25px;
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    line-height: 60px;
}
.singer:active{
    opacity: .8;
}
.singer-icon{
    flex: 0 0 50px;
    height: 50px;
}
.singer-icon img{
    border-radius: 50%;
}
.singer-name{
    flex: 1 0 auto;
    margin-left: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 14px;
}
</style>