<template>
    <div class="theme1">
        <m-header></m-header>
        <tab></tab>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
        <!-- <miniPlayer :action="action" :src="src" :rotate="rotate"/> -->
    </div>
</template>
<script>
import circleProgress from './base/circle-progress'
import miniPlayer from './components/mini-player'
import slider from './components/slider'
import { GET } from './api'
import tab from './components/tab'
import mHeader from './components/m-header'
export default {
    data: () => ({
        radius: 40,
        percent: 0.5,
        // src: img,
        rotate: true,
        action: 'pause'
    }),
    methods: {
        // fetchBanners(){
        //     GET('/banner', {type: 1}).then(res => {
        //         this.bannerItems = res.banners
        //     })
        // }
    },
    mounted(){
        // this.fetchBanners()


    },
    components: {
        circleProgress,
        miniPlayer,
        slider,
        mHeader,
        tab
    }
}
</script>
<style>
    body{
        background-color: #222;
    }
    *{
        margin: 0;
        padding: 0;
    }
    /* p{
        font-weight: bold;
    } */
    .theme1{
        font-size: 14px;
        color: #fd6c62;
        background-color: #222;
    }
    .theme2{
        font-size: 14px;
        /* color: rgba(255, 255, 255, .8); */
        color: hsla(0,0%,100%,.5);
        background-color: #222;
    }
    .theme3{
        font-size: 14px;
        color: rgba(255, 255, 255, .6);
        background-color: #222;
    }
    .circle-ctrl{
        flex: 0 0 40px;
        height: 40px;
        position: relative;
    }
    .main-play-icon{
        position: absolute;
        top: 12px;
        left: 13px;
        color: #666;
        zoom: .9;
        cursor: pointer;
    }
    .mini-player{
        padding: 10px;
        height: 60px;
        box-sizing: border-box;
        background-color: #fff;
        display: flex;
        flex-direction: row;
        align-items: center;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
    }
    .loading{
        height: 30px;
        width: 100%;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        line-height: 30px;
        text-align: center;
    }
    img[lazy=loading] {
        background-color: #666;
    }
    .mask{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        background-color: rgba(51, 51, 51, .4);
    }
    .mask-img{
        margin: 0 auto;
        flex: 0 0 30px;
    }
</style>
