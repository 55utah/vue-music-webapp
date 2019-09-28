<template>
    <div class="header">
        <div class="title">VMUSIC</div>
        <div class="list-icon"  @touchend="show()">
            <fa-icon name="bars"/>
        </div>
        <div class="left-menu" :style="{transform: translate}">
            <section class="left-head">
                <div class="left-back" @click="hide()">
                    <fa-icon name="chevron-left"/>
                </div>
                <div class="left-tab theme2">
                    <span class="tabs">
                        <span @click="tab(0)" :class="{tabHover: hover == 0 }">我喜欢的</span>
                        <span @click="tab(1)" :class="{tabHover: hover == 1 }">最近听的</span>
                    </span>
                </div>
            </section>
            <section class="left-content" ref="leftContent">
                <div class="left-wrap">
                <div class="left-default" v-if="list.length == 0">
                    <div class="default-box">
                        <div>
                            <fa-icon v-if="hover == 0" name="music"/>
                            <fa-icon v-else name="compact-disc"/>
                        </div>
                        <span>{{`你还没有${ hover == 0 ? '喜欢' : '听过' }的音乐哦~`}}</span>
                    </div>
                </div>
                <div class="left-list" v-else>
                    <div class="single" v-for="(b, i) in list" :key="i">
                        <div class="single-text" @click="gotoDetail(b)">
                            <p class="single-name">{{b.name}}</p>
                            <p class="single-art">{{b.artist}}</p>
                        </div>
                        <div class="single-icon" @click="deleteRecord(b)">
                            <fa-icon name="times"></fa-icon>
                        </div>
                    </div>
                </div>
                </div>
            </section>
        </div>
    </div>
</template>


<script>
import initScroll from '../common/scroll'
export default {
    data: () => ({
        translate: '',
        hover: 0,
        loveList: [],
        playedList: [],
        list: []
    }),
    methods: {
        init(){
            this.loveList = this.$store.getters.getLoveList
            this.playedList = this.$store.getters.getPlayedList
            // this.loveList = new Array(20).fill(0).map(p => {
            //     return  {id: 989, name: '其实我真的好累啊，哈哈哈.', artist: '开谢谢谢谢'}
            // })
            initScroll(this.$refs.leftContent, {bounce: true})
        },
        show(){
            this.translate = 'translateX(100%)'
            this.init()
        },
        hide(){
            this.translate = ''
        },
        tab(id){
            this.hover = id
            this.list = id == 0 ? this.loveList : this.playedList
        },
        gotoDetail({id, name, artist}){
            this.$store.commit('updateMusicInfo', { id, name, artist })
            this.$router.push({ name: 'header-player' })
        },
        deleteRecord({ id }){
            if(this.hover === 1){
                this.$store.commit('deletePlayedList', { ids: [id] })
                this.playedList = this.$store.getters.getPlayedList
                this.list = this.playedList
            }else{
                this.$store.commit('deleteLoveList', { ids: [id] })
                this.loveList = this.$store.getters.getLoveList
                this.list = this.loveList
            }
        }
    },
    mounted(){
        // this.init()
        this.tab(0)
    }
}
</script>


<style scoped>
    .header{
        width: 100%;
        height: 45px;
        position: relative;
        text-align: center;
    }
    .title{
        height: 100%;
        line-height: 45px;
        font-size: 18px;
        font-weight: bold;
    }
    .list-icon{
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        line-height: 45px;
        padding: 0 8px;
        margin-left: 8px;
        font-size: 18px;
    }
    .left-menu{
        position: fixed;
        top: 0;
        bottom: 0;
        width: 100%;
        left: -100%;
        z-index: 100;
        background-color: #222;
        transition: transform 0s ease;
        transition-duration: .4s; 
        transform: translate3d(0, 0, 0);
    }
    .left-back{
        position: absolute;
        top: 0px;
        left: 0px;
        height: 45px;
        width: 60px;
        color: rgba(255, 255, 255, .5);
        font-size: 24px;
        font-weight: bold;
        line-height: 45px;
    }
    .left-tab{
        margin: 0 auto;
        text-align: center;
        line-height: 45px;
        font-size: 16px;
    }
    .tabs{
        height: 30px;
        line-height: 30px;
        box-sizing: border-box;
        display: inline-flex;
        flex-flow: row nowrap;
        align-items: center;
        font-size: 14px;
        border: .5px solid #333;
        border-radius: 2px;
        overflow: hidden;
    }
    .tabs span{
        flex:0 1 80px;
        padding: 5px 20px;
        font-weight: bold;
    }
    .left-head{
        height: 45px;
        width: 100%;
    }
    .tabHover{
        color: rgba(255, 255, 255, .7);
        background-color: #333;
    }
    .left-content{
        height: calc(100vh - 45px);
        width: 100%;
        overflow: hidden;
        display: flex;
        display: -webkit-flex;
        flex-flow: column nowrap;
    }
    .left-wrap{
        flex: 1;
        width: 100%;
        display: flex;
        align-items: center;
        flex-flow: column nowrap;
        justify-content: center;
        padding: 20px 0;
    }
    .left-default{
        flex: 1;
        width: 100%;
        text-align: center;
        color: rgba(255, 255, 255, .3);
        font-size: 16px;
        display: flex;
        display: -webkit-flex;
        flex-flow: column;
        justify-content: center;
    }
    .default-box div{
        font-size: 50px;
        margin-bottom: 20px;
    }
    .default-box{
        flex: 0 0 100px;
        width: 100%;
    }
    .left-list{
        flex: 1;
        width: 100%;
        text-align: left;
    }
    .single{
        width: 100%;
        height: 44px;
        line-height: 22px;
        font-size: 1em;
        box-sizing: border-box;
        padding: 0 30px;
        color: rgba(255, 255, 255, .8);
        margin-top: 10px;
    }
    .single-text,.single-icon{
        display: inline-block;
        height: 100%;
        vertical-align: middle;
    }
    .single-icon{
        width: 35px;
        line-height: 44px;
        font-size: 20px;
        color: rgba(255, 255, 255, .2);
        text-align: center;
    }
    .single-text{
        width: calc(100% - 40px);
    }
    .single-name,.single-art{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    /* .single:nth-child(odd){
        background-color: rgba(42, 42, 42, .8);
    } */
    .single-art{
        font-size: 12px;
        color: rgba(255, 255, 255, .3);
    }
</style>