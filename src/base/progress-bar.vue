<template>
    <div class="progress">
        <div class="lyric-box">
            <div class="lyric-content">
                <p>{{cur_lyric}}</p>
            </div>
        </div>
        <div class="progress-box">
            <span class="prev-time">{{countTime(prevTime)}}</span>
            <div class="outline-bar" ref="outline" @touchstart="musicSeek">
                <div class="inline-bar" :style="{width: left + 'px'}"></div>
                <div ref="moveBar" class="moved-bar" :style="{left: left + 'px'}" @touchstart="touchstart" @touchend="touchend"></div>
            </div>
            <span class="total-time">{{countTime(totalTime)}}</span>
        </div>
        <div class="ctrlWrapper">
            <div class="ctrlButtons">
                <span v-for="(part,i) in ctrlNames" :key="i" :style="{fontSize: i==2?'24px':'', color: (i==4&&markLove)?'#fd6c62':''}"  @touchend="part.fn(part)">
                    <fa-icon class="ctrlButton" :name="part.name" />
                </span>
            </div>
        </div>
    </div>
</template>


<script>
import { setInterval, clearTimeout } from 'timers';
import lyric_parser from '../common/parseLyrics'
export default {
    props:{
        // url: {
        //     type: String
        // },
        // lyric: {
        //     type: String
        // },
        // info: {
        //     type: Object
        // }
    },
    data: () => ({
        left: 0,
        prevTime: 0,
        totalTime: 0,
        audio: undefined,
        timer: undefined,
        barAuto: true,
        ctrlNames: [],
        markLove: false,
        lyric_next: undefined,
        cur_lyric: undefined,
        url: '',
        lyric: '',
        info: {
            id: 0,
            name: '',
            artist: ''
        }
    }),
    methods: {
        touchstart(e){
            this.barAuto = false
            let baseX = e.touches[0].clientX, prevLeft = +this.left, lineWidth = this.$refs.outline.clientWidth
            document.body.ontouchmove = ev => {
                let clientX = ev.touches[0].clientX
                let b = prevLeft + clientX - baseX
                this.left = Math.max(Math.min(lineWidth, b), 0)
                if(this.audio){
                    this.prevTime = this.getCurrentTime()
                }
            }
        },
        touchend(){
            document.body.ontouchmove = null
            this.barAuto = true
            if(this.audio){
                this.prevTime = this.getCurrentTime()
                this.updateMusic()
            }
        },
        updateMusic(){
            this.audio.currentTime = this.getCurrentTime()
        },
        musicSeek(e){
            if(e.target == this.$refs.moveBar) return
            if(!e.touches || e.touches.length == 0) return
            let x = e.touches[0].clientX
            this.left = x - this.$refs.outline.offsetLeft
            this.updateMusic()
        },
        init(b){
            [ this.url, this.lyric, this.info ] = [ b.url, b.lyric, b.info ]
            let p = this.audio = new Audio
            p.src = this.url
            this.left = 0
            p.oncanplay = () => {
                this.totalTime = p.duration
                this.prevTime = p.currentTime
                p.volume = 1
                this.changePlayedList()
                this.$parent.mask.hide()
            }
            this.barAuto = true
            p.ontimeupdate = this.updateTime
            this.setButtons()
            this.lyric_next = lyric_parser(this.lyric)
            this.markLove = false
        },
        updateTime(){
            if(this.barAuto) {
                let p = this.audio
                this.totalTime = parseInt(p.duration)
                this.prevTime = parseInt(p.currentTime)
                this.left = (p.currentTime / p.duration * this.$refs.outline.clientWidth).toFixed(1)
            }
            this.updateLyrics()
        },
        updateLyrics(){
            if(!this.lyric || !this.lyric_next) return
            let re = this.lyric_next(this.audio.currentTime)
            if(re) this.cur_lyric = re
        },
        play(){
            if(this.audio){
                this.audio.play()
                // this.$emit('onplay', true)
            }
        },
        pause(){
            if(this.audio){
                this.audio.pause()
            // this.$emit('onplay', false)
            }
        },
        setButtons(){
            this.ctrlNames = [
                {name: 'music', arr: ['music', 'random', 'retweet'], fn: p => {
                    const index = this.update(p)
                    p.name = p.arr[index]
                }},
                {name: 'backward', fn: () => {


                }},
                {name: 'play', arr: ['play', 'pause'],fn: p => {
                    const index = this.update(p)
                    p.name = p.arr[index]
                    if(index == 0) this.pause()
                    else this.play()
                }},
                {name: 'forward', fn: () => {}},
                {name: 'heart', fn: p => {
                    this.markLove = !this.markLove
                    this.changeLoveList(!this.markLove)
                }}
            ]
        },
        update({name, arr}){
            let i = arr.indexOf(name)
            if(i == -1) return name
            return i < arr.length - 1 ? i + 1 : 0
        },
        changeLoveList(bool){
            let info = this.info
            if(bool === true)  this.$store.commit('updateLoveList', { id: info.id, name: info.name, artist:info.artist })
            if(bool === false) this.$store.commit('deleteLoveList', { ids: [info.id] })
        },
        changePlayedList(){
            let info = this.info
            this.$store.commit('updatePlayedList', { id: info.id, name: info.name, artist:info.artist })
        }
    },
    computed: {
        countTime(time){
            return time => {
                return  `${('0'+Math.floor(time / 60)).slice(-2)}:${('0' + Math.floor(time) % 60).slice(-2)}`
            }
        },
        getCurrentTime(){
            return () => this.left / this.$refs.outline.clientWidth * this.totalTime
        }
    },
    // watch: {
        // url: function(newValue, oldValue){
        //     if(newValue && newValue.length > 0){
        //         this.init()
        //     }
        // }
    // },
    mounted(){
        console.log('progress bar init')
        this.$parent.$on('stop', ev => {
            this.pause()
            this.prevTime = 0
        })
        this.$parent.$on('canplay', ev => {
            console.log('canplay go init')
            let { url, lyric, info } = ev.detail
            this.init({ url, lyric, info })
        })
    }
}
</script>


<style scoped>
.progress{
    width: 100%;
    text-align: center;
}
.progress-box{
    width: 80%;
    height: 100%;
    height: 40px;
    line-height: 40px;
}
.outline-bar, .progress-box, .inline-bar, .moved-bar{
    display: inline-block;
}
.outline-bar{
    width: calc(100% - 100px);
    height: 4px;
    background-color: rgba(0, 0, 0, .4);
    position: relative;
    margin: 0 10px;
    vertical-align: middle;
}
.inline-bar{
    height: 4px;
    background-color: #fd6c62;
    position: absolute;
    left: 0;
}
.moved-bar{
    height: 6px;
    width: 6px;
    border: 4px solid #fff;
    border-radius: 50%;
    background-color: #fd6c62;
    position: absolute;
    top: -5px;
    left: 0;
}
.prev-time, .total-time{
    font-size: 12px;
}
.ctrlWrapper{
    width: 100%;
}
.ctrlButtons{
    color: rgba(255,255,255,.8);
    display: inline-flex;
    align-items: center;
    width: 80%;
}
.ctrlButtons span{
    flex: 1 0 30px;
    font-size: 18px;
}
.lyric-box{
    width: 100%;
    height: 40px;
    line-height: 20px;
}


</style>