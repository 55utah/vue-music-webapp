<template>
    <div class="rank theme2">
        <router-view></router-view>
        <div class="rank-content" ref="rankContent">
            <div>
            <div class="loading" v-if="list.length == 0">
                <img width="24" height="24" :src="loading">
            </div>
            <div class="rank-title">官方榜</div>
            <ul class="rank-list">
                <li @click="gotoDetail(item)" class="rank-item" v-for="(item, i) in list" :key="i">
                    <div class="rank-icon"><img width="100%" height="100%" v-lazy="item.coverImgUrl + '?param=200y200'"/></div>
                    <div class="rank-detail">
                        <span v-for="(d,index) in item.tracks" :key="index">{{(index+1) + '. ' + d.first + '-' + d.second}}</span>
                    </div>
                </li>
            </ul>
            <!-- <div class="rank-title">其他榜单</div>
            <ul class="rank-list2">
                <li @click="gotoDetail(item)" class="rank-item2" v-for="(item, i) in otherList" :key="i">
                    <div class="rank-icon2"><img width="100%" height="100%" v-lazy="item.coverImgUrl + '?param=200y200'"/></div>
                    <div class="rank-name">{{item.name}}</div>
                </li>
            </ul> -->
            </div>
        </div>
    </div>
</template>


<script>
import { GET } from '../api'
import initScroll from '../common/scroll'
import loading from '../common/loading'
import rankParse from '../common/rankParse'
export default {
    data: () => ({
        loading: loading.load,
        list: [],
        otherList: []
    }),
    methods: {
        fetchRank(){
            GET('/toplist/detail').then(res => {
                this.list = res.list.slice(0, 4)
                this.otherList = res.list.slice(4)
                initScroll(this.$refs.rankContent, {bounce: true})
            })
        },
        gotoDetail(item){
            let r = rankParse(item.name)
            if(r == -1) return
            this.$store.commit('updateMusicList', { pic: item.coverImgUrl, title: item.name, path: '/top/list', type: 'rank' })
            this.$router.push({name: 'rankDetail', query: {idx: r}})
        }
    },
    mounted(){
        this.fetchRank()
    }
}
</script>


<style scoped>
.rank{
    position: fixed;
    top: 95px;
    bottom: 0;
    overflow: hidden;
    width: 100%;
}
.rank-content{
    width: 100%;
    height: 100%;
}
.rank-list{
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    align-items: center;
}
.rank-item{
    list-style-type: none;
    flex: 0 0 100px;
    margin: 10px 0;
    width: calc(100% - 40px);
    background-color: #333;
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
}
.rank-icon{
    flex: 0 0 100px;
    height: 100px;
}
.rank-detail{
    flex: 1;
    height: 100%;
    padding: 8px 15px;
    line-height: 28px;
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;
    max-width: calc(100% - 120px);
    overflow: hidden;
}
.rank-detail span{
    flex: 1 0 25px;
    width: 95%;
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.rank-title{
    width: 100%;
    height: 40px;
    padding: 0 30px;
    font-size: 16px;
    font-weight: bold;
    color: rgba(255, 255, 255, .6);
    line-height: 40px;
}
.rank-list2{
    width: 100%;
    padding: 0 20px;
    display: flex;
    display: -webkit-flex;
    flex-flow: row wrap;
    align-items: center;
}
.rank-item2{
    flex: 1 0 30%;
    list-style-type: none;
    text-align: center;
    margin: 10px 0;
}
.rank-icon2{
    width: 90px;
    height: 90px;
}
.rank-icon img, .rank-icon2 img{
    border-radius: 4px;
}
.rank-name{
    width: 90px;
    padding: 2px;
    font-size: 12px;
    height: 30px;
    line-height: 15px;
    text-align: left;
}
</style>