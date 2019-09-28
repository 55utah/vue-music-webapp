<template>
     <div class="slider" ref="slider">
        <ul class="slider-content" ref="content">
             <slot></slot>
        </ul>
        <div class="bar">
            <span v-for="(b, i) in dots" :key="i" :class="{active: i == active}"></span>
        </div>
     </div>
 </template>
 <script>
 import BScroll from 'better-scroll'
import { setInterval } from 'timers';
 export default {
     props:{
         interval:{
             type: Number,
             default: 3000
         }
     },
     data: () => ({
         dots: [],
         active: 0,
         timer: undefined,
         width: 0,
         slider: undefined
     }),
     computed: {
         
     },
     methods: {
         initDom(){
            const sliderDom = this.$refs.slider
            const content = this.$refs.content
            const clientWidth = document.body.clientWidth
            this.width = clientWidth
            sliderDom.style.width = this.width + 'px'
            content.style.width = (content.children.length + 2) * this.width + 'px'
            sliderDom.style.height = 420 / 1080 * this.width + 'px'
         },
         initScrollEnd(){
             this.slider.on('scrollEnd', () => {
                let x = this.slider.getCurrentPage().pageX
                this.active = x
                if(this.timer) window.clearTimeout(this.timer) 
                this.play()
            })
            this.play()
         },
         initSlider(){
            this.slider = new BScroll(this.$refs.slider, {
                scrollX: true,
                scrollY: false,
                momentum: false,
                snap: {
                    loop: true,
                    threshold: 0.3,
                    speed: 600
                },
                bounce: false,
                stopPropagation: true,
                click: true
            })
         },
         initDots(){
             this.dots = new Array(this.$refs.content.children.length - 2).fill(0)
         },
         play(){
            this.timer = window.setTimeout(() => {
                this.slider.next()
            }, this.interval)
         },
         init(){
             this.initDom()
             this.initSlider()
             this.initScrollEnd()
             this.initDots()
         }
     },
     mounted(){
        
     },
     activated(){
         setTimeout(() => {
             if(this.$refs.content.children && this.$refs.content.children.length > 1){
                 this.init()
             }
         }, 50)
        window.addEventListener('resize', () => {
            if (!this.slider) {
                return
            }
            this.initDom()
        })
     },
     destroyed () {
        clearTimeout(this.timer)
     }
 }
 </script>
 <style scoped>
    .slider{
        height:150px;
        overflow: hidden;
        position: relative;
    }
    .slider-content{
        display: flex;
        display: -webkit-flex;
        flex-direction: row;
        justify-items: center;
        height: 100%;
        overflow: hidden;
    }
    .slider-content li{
        flex: 0 0 auto;
        height: 100%;
        list-style-type: none;
        text-align: center;
    }
    .slider-content li span{
        display: inline-block;
    }
    .bar{
        position: absolute;
        bottom: 10px;
        left: 0;
        right: 0;
        height: 8px;
        text-align: center;
        font-size: 0;
    }
    .bar span{
        width: 8px;
        height: 8px;
        border-radius: 4px;
        background-color: hsla(0,0%,100%,.5);
        list-style-type: none;
        display: inline-block;
        margin:0 2px;
    }
    .active{
        width: 20px!important;
        background-color: hsla(0,0%,100%,.8);
    }
 </style>
 