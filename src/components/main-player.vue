<template>
    <!-- <transition name="slide2"> -->
        <div class="player theme3">
            <div class="background" :style="background"></div>
            <div class="player-content" ref="playerContent">
                <div class="player-head">
                    <div class="player-btn" @touchend="back()">
                        <fa-icon class="player-icon" name="chevron-down"/>
                    </div>
                    <div class="player-text" :style="{lineHeight: info.artist?'':'50px'}">
                        <p class="name">{{info.name}}</p>
                        <p class="artist">{{info.artist}}</p>
                    </div>
                </div>
                <div class="middle">
                    <div class="main-face">
                        <div :style="{animationPlayState: playing?'running':'paused'}"><img :src="pic" width="100%" height="100%"/></div>
                    </div>
                </div>
                <div class="controler">
                    <progress-bar :info="info" :url="url" :lyric="lyric" @onplay="handleState"></progress-bar>
                    <!-- <progress-bar @onplay="handleState"></progress-bar> -->
                </div>
            </div>
        </div>
    <!-- </transition> -->
</template>


<script>
import { GET } from '../api'
import { setTimeout, setInterval, clearInterval } from 'timers'
import progressBar from '../base/progress-bar'
import loading from '../common/loading'


export default {
    data:() => ({
        pic: '',
        info: {
            id: 0,
            name: '',
            artist: ''
        },
        url: '',
        lyric: '',
        playing: false,
        angle: 0,
        timer: undefined,
        mask: ''
    }),
    methods:{
        back(){
            this.$emit('stop')
            this.$nextTick(() => {this.pic = loading.de})
            this.$router.back()
        },
        fetch(){
            const info = this.info = this.$store.getters.getSongInfo
            info.id = Number(info.id)
            console.log(info)
            this.fetchMusicInfo(info.id).then( ({ url, picUrl, lyric }) => {
                if(!url) {
                    window.alert('歌曲无法播放.')
                    this.$router.back()
                }
                [ this.url, this.pic, this.lyric ] = [ url, picUrl, lyric ]
                this.$emit('canplay', { detail: { url, lyric, info: info } })
            })


        },
        handleState(bool){
            this.playing = bool
        },
        async fetchMusicInfo(id){
            const detailPro = GET('/song/detail', { ids: id })
            const urlPro =  GET('/song/url', { id })
            const lyricPro = GET('/lyric', { id })
            try{
                const { songs: [ { al: { picUrl } } ] } = await detailPro
                const { data: [ { url } ] } = await urlPro
                const { lrc: { lyric } } = await lyricPro
                return { url, picUrl, lyric } 
            }catch(err){
                console.log(err)
                return {}
            }
        }
        
    },
    computed: {
        background(){
            return `filter: blur(30px) opacity(40%);backgroundImage: url(${this.pic})`
        }
    },
    mounted(){
        this.mask = loading.mask(this.$refs.playerContent)
        this.mask.show()
        this.fetch()
    },
    components: {
        progressBar
    }
}
</script>


<style>
.slide2-enter, .slide2-leave-to {
    opacity: 0;
}
.slide2-enter-active, .slide2-leave-active{
    transition: all .4s ease;
}
.slide2-leave, .slide2-enter-to{
    opacity: 1;
}
.player{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 200;
}
.player-content{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 5;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
}
.background{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-position: center center;
    background-size: contain;
}
.player-head{
    width: 100%;
    flex: 0 0 50px;
    margin: 5px 0;
    padding-bottom: 35px;
    max-height: 50px;
}
.player-head .player-btn{
    height: 100%;
    width: 50px;
    line-height: 50px;
    text-align: center;
    display: inline-block;
    vertical-align: bottom;
}
.player-icon{
    width: 20px!important;
    height: 20px!important;
}
.player-head .player-text{
    width: calc(100% - 100px);
    height: 100%;
    line-height: 25px;
    text-align: center;
    display: inline-block;
}
.player-text p{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.name{
    color: rgba(255, 255, 255, .8);
    font-weight: 500;
}
.artist{
    color: rgba(255, 255, 255, .4);
    font-size: 12px;
}


.main-face{
    width: 100%;
    height: 0;
    padding-top: 70%;
    position: relative;
}
.main-face div{
    height: 100%;
    width: 70%;
    position: absolute;
    top:0;
    left: 15%;
    animation: rotate 20s infinite linear;
}
@keyframes rotate {
    100%{transform: rotateZ(360deg)}
}
@-webkit-keyframes rotate {
    100%{transform: rotateZ(360deg)}
}
.main-face div img{
    border-radius: 50%;
    box-shadow: 0 0 0 12px rgba(0, 0, 0, .1);
}
.middle{
    margin: 20px 0;
    width: 100%;
    flex: 1 0 auto;
}
.controler{
    width: 100%;
    flex: 1 0 auto;
}
</style>
