<template>
    <keep-alive>
    <transition>
    <div class="list-content theme2">
        <router-view></router-view>
        <div class="inner">
        <div @touchend="back()" class="list-head" :style="bgStyle">
            <div>
                <span>
                    <fa-icon class="back-icon" name="chevron-left"/>
                </span>
                <span class="list-title">{{musicInfo.title}}</span>
            </div>
        </div>
        <div class="rank-content" ref="content">
            <div class="list">
                <div class="loading loading2"  v-if="dataList.length == 0">
                    <img width="24" height="24" :src="loading">
                </div>
                <div class="music-item theme3" v-for="(item, i) in dataList" :key="i" @click="gotoDetail(item)">
                    <div class="num">{{i}}</div>
                    <div class="info" :style="{lineHeight: item.artist?'':'48px'}">
                        <p class="name">{{item.name}}</p>
                        <p class="artist" v-if="item.artist">{{item.artist}}</p>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>
    </transition>
    </keep-alive>
</template>
<script>
import { setTimeout } from 'timers';
import loading from '../common/loading'
import { GET } from '../api'
import initScroll from '../common/scroll'
export default {
    data: () => ({
        loading: loading.load,
        musicInfo: {
            pic: '',
            title: '',
            path: ''
        },
        dataList: []
    }),
    methods: {
        fetchMusicList(){
            this.musicInfo = this.$store.getters.getListInfo
            let params = this.$route.query, key = '', value = ''
            for(let k in params){
                key = k
                value = params[key]
            }
            GET(this.musicInfo.path, {[key]: value}).then(res => {
                let type = this.musicInfo.type, id = value
                if(type == 'recommend'){
                    this.dataList = res.playlist.tracks.map( p => {
                        return { name: p.name, artist: p.ar[0].name, id: p.id}
                    })
                }
                else if(type == 'singer'){
                    this.dataList = res.hotSongs.map( ({name, id}) => ({name, id}))
                }
                else if(type == 'rank'){
                    this.dataList = res.playlist.tracks
                }
                initScroll(this.$refs.content, {bounce: true})
            })
        },
        back(){
            if(window.history.length > 0) this.$router.go(-1)
        },
        gotoDetail(item){
            this.$store.commit('updateMusicInfo', { id: item.id, name: item.name, artist:item.artist || this.musicInfo.title })
            this.$router.push({ name: 'player' })
        }
    },
    computed: {
        bgStyle(){
            return `backgroundImage: url(${this.musicInfo.pic})`
        }
    },
    mounted(){
        this.fetchMusicList()
    }
}
</script>


<style scoped>
.list-content{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 20;
}
.loading2{
    position: fixed;
    top: 60%;
}
.slide-leave-active, .slide-enter-active {
  transition: all .5s ease;
}
.slide-leave, .slide-enter-to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
}
.slide-leave-to, .slide-enter {
    transform: translate3d(80%, 0, 0);
    opacity: 0;
}
.list{
    position: relative;
    width: 100%;
}
.rank-content{
    width: 100%;
    height: calc(100vh - 200px);
    overflow: hidden;
}
.list-head{
    width: 100%;
    height: 200px;
    background-position: center center;
    background-size: cover;
}
.list-head div{
    width: 100%;
    height: 40px;
    font-size: 15px;
    padding: 0 10px;
    line-height: 40px;
    color: rgba(255, 255, 255, .8);
    white-space: nowrap;
}
.list-head div span{
    vertical-align: middle;
}
.back-icon{
    width: 20px;
    height: 20px;
}
.list-title{
    display: inline-block;
    margin-left: 5px;
    font-size: 14px;
    font-weight: 500;
    width: 80%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.music-item{
    width: 100%;
    height: 50px;
    border-bottom: 1px solid rgba(0, 0, 0, .8);
}
.music-item div{
    display: inline-block;
}
.music-item .num{
    width: 50px;
    height: 100%;
    font-size: 16px;
    line-height: 50px;
    text-align: center;
    vertical-align: bottom;
}
.music-item .info{
    height: 48px;
    line-height: 24px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: calc(100% - 60px);
}
.info .name{
    font-size: 14px;
}
.info .artist{
    font-size: 12px;
    color: rgba(255, 255, 255, .4);
}
</style>
