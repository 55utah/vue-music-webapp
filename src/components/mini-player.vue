<template>
    <div class="mini-player">
         <div class="person">
             <img width="40" height="40" :src="src" :class="{animation: rotate}"/>
         </div>
         <div class="info">
             <p>六月的风声六月的风声六月的风声六月的风声六月的风声</p>
             <p>小胡</p>
         </div>
         <circleProgress :radius="radius" :percent="+percent">
            <fa-icon class="main-play-icon" :name="action"></fa-icon>
        </circleProgress>
        <div class="history">
            <fa-icon class="history-icon" name="list"></fa-icon>
        </div>
    </div>
</template>


<script>
import circleProgress from '../base/circle-progress'
export default {
    props: {
        src: {
            type: String,
            required: true
        },
        // info: {
        //     type: Object,
        //     required: true
        // },
        rotate: {
            type: Boolean,
            required: true
        },
        action: {
            type: String,
            default: 'play'
        }
    },
    data: ()=>({
        radius: 40,
        percent: 0.5
    }),
    components: {
        circleProgress
    }
}
</script>


<style scoped>
.person {
    height: 40px;
    margin-left: 10px;
    flex: 0 0 40px;
}
.person img {
    border-radius: 50%
}
.info {
    flex: 1;
    overflow: hidden;
    height: 40px;
    margin-left: 8px;
    margin-right: 5px;
}
.info p {
    height: 20px;
    line-height: 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.info p:first-child {
    color: #222;
    font-size: 14px;
}
.info p:last-child {
    font-size: 12px;
    color: rgba(0, 0, 0, .4);
}
.history{
    flex: 0 0 25px;
    height: 40px;
    margin:0 5px 0 5px;
    line-height: 30px;
    color: rgba(0, 0, 0, .6);
    text-align: center;
}
.history-icon{
    height: 26px;
    width: 26px;
    vertical-align: middle;
}
.animation {
    animation: rotate 5s infinite linear;
}
@keyframes rotate {
    100%{
        transform: rotateZ(360deg)
    }
}
</style>