<template>
<div class="circle-ctrl">
    <svg class="mainSvg" :width="radius" :height="radius" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50%" cy="50%" :r="radius" class="circle circle_a"></circle>
        <circle cx="50%" cy="50%" :r="radius" class="circle circle_b" :style="{strokeDasharray: dashValue}"></circle>
        <!-- 圆角也可以做，stroke-linecap可以设置描边末端的样式，stroke-linecap="round"即可  -->
    </svg>
    <slot></slot>
</div>
</template>
<script>
export default {
    props: {
        radius: {
            type: Number,
            default: 50
        },
        percent: {
            type: Number,
            default: 0
        }
    },
    computed: {
        dashValue(){
            let p = this.radius * 2 * Math.PI * this.percent
            return p + ',500'
        }
    }
}
</script>
<style module>
.mainSvg{
    transform: rotateZ(-90deg);
    -webkit-transform: rotateZ(-90deg);
    zoom: .9;
}
.circle{
    fill: transparent;
}
.circle_a{
    stroke: rgba(18, 18, 18, .6);
    stroke-width: 8;
}
.circle_b{
    stroke-width: 8;
    stroke: #fd6c62;
}
</style>
