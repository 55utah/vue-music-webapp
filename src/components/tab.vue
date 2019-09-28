<template>
    <div class="tab-menu">
        <router-link tag="div" v-for="route in routes" :key="route.name" :to="route.link" active-class="active">
            <span>{{route.name}}</span>
        </router-link>
    </div>
</template>


<script>
export default {
    data: ()=>({
        routes: [{
            name: '推荐',
            link: '/recommend'
        },{
            name: '歌手',
            link: '/singer'
        },{
            name: '排行',
            link: '/rank'
        },{
            name: '搜索',
            link: '/search'
        }]
    }),
    components:{},
    mounted(){}
}
</script>
<style scoped>
    .tab-menu{
        width: 100%;
        height: 50px;
        display: inline-flex;
        display: -webkit-inline-flex;
        flex-flow: row nowrap;
        text-align: center;
        line-height: 40px;
    }
    .tab-menu div{
        flex: auto;
        text-decoration: none;
        font-size: 15px;
        font-weight: 600;
    }
    .active span{
        border-bottom: 2px solid currentColor;
    }
</style>