<template>
    <div class="recommend theme1">
        <router-view></router-view>
        <div class="inner" ref="inner">
            <div class="innerContent">
            <slider>
                <li @click="gotoDetail(item)" v-for="(item, index) in bannerItems" :key="index" :style="{width: bannerWidth + 'px'}">
                    <span><img height="100%" width="100%" :src="item.pic"/></span>
                </li>
            </slider>
            <div class="com-title">{{'推荐歌单'}}</div>
            <div class="box">
                <div class="content">
                    <div class="song-list" v-for="(item, i) in list" :key="i" @click="showDetail(item)">
                        <div class="img"><img v-lazy="item.picUrl + '?param=120y120'" width="100%" height="100%"/></div>
                        <div class="text theme2">
                            <div class="name">{{item.name}}</div>
                            <div class="count theme3">
                                <fa-icon name="headphones"/><span style="margin-left: 5px">{{ convert(item.playCount) }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    </div>
</template>


<script>
import slider from './slider'
import { GET } from '../api'
import { setTimeout } from 'timers'
import initScroll from '../common/scroll'
export default {
    data: () => ({
        bannerItems: [],
        bannerWidth: 0,
        list: []
    }),
    methods: {
        fetchBanners(){
            this.bannerWidth = document.body.clientWidth
            GET('/banner', {type: 1}).then(res => {
                this.bannerItems = res.banners
            })
            GET('/personalized').then(res => {
                this.list = res.result
            })
        },
        showDetail({id, name, picUrl}){
            this.$store.commit('updateMusicList', { pic: picUrl, title: name, path: '/playlist/detail', type: 'recommend' })
            this.$router.push({ name: 'recommendDetail', query: {id: id}})
        },
        gotoDetail(item){
            return
            this.$store.commit('updateMusicInfo', { id: item.targetId, name: '', artist:'' })
            this.$router.push({ name: 'outPlayer' })
        }
    },
    computed: {
        convert(){
            return function(v){
                if(typeof v != 'number' || v < 10000) return v
                return (v / 10000).toFixed(0) + '万'
            }
        }
    },
    watch:{
        list: function(newList, oldList){
            if(oldList.length == 0 && newList.length != 0){
                this.bannerWidth = document.body.clientWidth
                initScroll(this.$refs.inner, {bounce: true})
            }
        }
    },
    mounted(){
        this.fetchBanners()
    },
    components:{
        slider
    }
}
</script>


<style scoped>
.recommend{
    position: fixed;
    top: 95px;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
    z-index: 10;
}
.inner{
    height: 100%;
    overflow: hidden;
}
.box{
    width: 100%
}
.content{
    width: 100%;
    padding: 0 20px;
}
.com-title{
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 15px;
    font-weight: 500;
}
.song-list{
    color: #fd6c62;
    padding: 5px 0;
    display: flex;
    display: -webkit-flex;
    flex-flow: row nowrap
}
.img{
    display: inline-block;
    flex: 0 0 60px;
    height: 60px;
}
.text{
    flex: auto;
    display: inline-block;
    vertical-align: top;
    margin-left: 10px;
    color: rgba(255, 255, 255, .8);
    overflow: hidden;
}
.name,.count{
    width: calc(100% - 60px);
    display: block;
    line-height: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.count{
    font-size: 12px;
    color: rgba(255, 255, 255, .6);
}
</style>