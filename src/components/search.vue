<template>
    <div class="search-box theme2">
            <router-view></router-view>
        <div class="search-input">
            <div>
                <span class="searchIcon"><fa-icon name="search"/></span>
                <input class="s-input" v-model="keyword" @input="handleChange"/>
                <span class="searchIcon" @click="clearSearch()" v-if="keyword.trim().length > 0"><fa-icon name="times"/></span>
            </div>
        </div>
        <div class="result-content">
            <div class="loading" v-if="loadingState">
                <img width="24" height="24" :src="loading">
            </div>
            <div v-if="!loadingState && resultList.length == 0">
                <div class="hot-title">热门搜索</div>
                <ul class="hot-list">
                    <li @click="hotSearch(hot)" class="hot-item" v-for="(hot, i) in hotList" :key="i">{{hot.first}}</li>
                </ul>
            </div>
            <div class="search-content" ref="searchContent">
                <ul class="search-result">
                    <li @click="gotoDetail(re)" class="result-item" v-for="(re, i) in resultList" :key="i">
                        <span style="margin-right: 5px"><fa-icon name="music"></fa-icon></span>
                        <span>{{re.name + '-' + re.artist}}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>


<script>
import loading from '../common/loading'
import { GET } from '../api';
import initScroll from '../common/scroll'
export default {
    data: () => ({
        loading: loading.load,
        loadingState: false,
        hotList: [],
        resultList: [],
        handleFn: undefined,
        keyword: ''
    }),
    methods:{
        fetchHotList(){
            this.loadingState = true
            GET('/search/hot').then(res => {
                this.loadingState = false
                this.hotList = res.result.hots
            })
        },
        clearSearch(){
            this.keyword = ''
            this.checkInput()
        },
        hotSearch(hot){
            this.keyword = hot.first
            this.fetchResult(this.keyword)
        },
        checkInput(){
            if(this.keyword.trim().length == 0) this.resultList = []
        },
        handleChange(){
            if(this.keyword.trim().length == 0) this.resultList = []
            else this.handleFn(this.keyword)
        },
        fetchResult(keyword){
            // /search?keywords='xxx'&limit=20&type=1
            // 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
            this.loadingState = true
            GET('/search', {keywords: keyword, type: 1, limit: 30}).then(res => {
                this.loadingState = false
                let songs = res.result.songs
                this.resultList = songs ? songs.map( ({id, name, artists}) => ({id, name, artist: artists.map(i => i.name).join('/')}) ) : []
                initScroll(this.$refs.searchContent, {bounce: true})
                this.checkInput()
            })
        },
        gotoDetail(item){
            this.$store.commit('updateMusicInfo', { id: item.id, name: item.name, artist:item.artist })
            this.$router.push({ name: 'player' })
        },
        // 防抖
        debounce(fn, session){
            let id
            return function(args){
                window.clearTimeout(id)
                id = window.setTimeout(() => { 
                    fn.apply(null, args)
                }, session)
            }
        }
    },
    computed: {
        
    },
    mounted(){
        this.fetchHotList()
        this.handleFn = this.debounce(this.fetchResult, 1000)
        
    }
}
</script>


<style scoped>
.search-box{
    position: fixed;
    top: 95px;
    bottom: 0;
    overflow: hidden;
    width: 100%;
}
.search-input{
    margin: 20px;
}
.search-input div{
    background-color: #333;
    display: flex;
    display: -webkit-flex;
    flex-flow: row nowrap;
    width: 100%;
    padding: 0 6px;
    height: 40px;
    background: #333;
    border-radius: 6px;
    box-sizing: border-box;
}
.searchIcon{
    font-size: 18px;
    line-height: 40px;
    margin: 0 10px;
    color: #111;
}
.s-input{
    outline: 0;
    border: none;
    background-color: #333;
    flex: 1;
    font-size: 14px;
    color: rgba(255, 255, 255, .9);
}
.hot-list{
    margin: 20px;
    display: inline-flex;
    flex-flow: row wrap;
    align-items: center;
}
.hot-item{
    list-style-type: none;
    flex: 0 0 auto;
    height: 20px;
    background-color: #333;
    color: rgba(255, 255, 255, .4);
    border-radius: 2px;
    padding: 5px;
    margin: 5px 5px;
}
.hot-title{
    margin: 10px 0 0 20px;
    font-size: 14px;
}
.search-result{
    width: 100%;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    align-items: left;
}
.result-item{
    flex: 40px;
    width: 90%;
    padding: 0 20px;
    line-height: 40px;
    list-style-type: none;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.result-item:nth-child(odd){
    background-color: rgba(42, 42, 42, .8);
}
.search-content{
    width: 100%;
    height: calc(100vh - 175px);
    overflow: hidden;
}
</style>