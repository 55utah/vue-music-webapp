import Vue from 'vue'
import vueRouter from 'vue-router'
import store from './store'
import vueLazyLoad from 'vue-lazyload'


Vue.use(vueRouter)
Vue.use(vueLazyLoad)
import App from './app.vue'
import './common/load-font-awesome'


import faIcon from './base/fa-icon'
Vue.component('fa-icon', faIcon)


import recommendView from "./components/recommend"
import singerView from "./components/singer"
import rankView from "./components/rank"
import searchView from "./components/search"
import musicListView from "./components/music-list"
import mainPlayer from './components/main-player'


const router = new vueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/recommend'
        },
        {
            path: '/recommend',
            component: recommendView,
            children: [{
                name: 'recommendDetail',
                path: '/detail',
                component: musicListView,
                children: [{
                    path: '/player',
                    name: 'player',
                    component: mainPlayer
                }],
            },
            {
                path: '/player',
                name: 'outPlayer',
                component: mainPlayer
            }]
        },
        {
            path: '/singer',
            component: singerView,
            children: [{
                path: '/detail',
                name: 'singerDetail',
                component: musicListView,
                children: [{
                    path: '/player',
                    name: 'player',
                    component: mainPlayer
                }]
            }]
        },
        {
            path: '/player',
            name: 'header-player',
            component: mainPlayer
        },
        {
            path: '/rank',
            component: rankView,
            children: [{
                path: '/detail',
                name: 'rankDetail',
                component: musicListView,
                children: [{
                    path: '/player',
                    name: 'player',
                    component: mainPlayer
                }]
            }]
        },
        {
            path: '/search',
            component: searchView,
            children: [{
                path: '/player',
                name: 'player',
                component: mainPlayer
            }]
        }
    ]
})


const app = new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
})
window.app = app