//入口文件
// console.log('ok');//测试代码
import Vue from 'vue';
// 导入app组件
import app from './App.vue';
// 导入mui所需要的的css和js文件
import './lib/mui/css/mui.min.css';
// 参照mui官方文档，扩展字体要使用，需要添加
import './lib/mui/css/icons-extra.css';
import './lib/mui/fonts/mui-icons-extra.ttf';
import './lib/mui/js/mui.min.js';
// 固定在顶部栏，要引用Mint UI中的组件
import { Header } from 'mint-ui';
Vue.component(Header.name, Header);
/* 
vue路由的使用过程：1.除了安装使用vue需要的包 vue、vue-loader、vue-template-compiler包，还需要安装vue路由包vue-router
2.导入vue-router包，拿到VueRouter对象，并使用Vue.use注册到vue中
3.在vue实例vm中挂载router
*/
import VueRouter from 'vue-router'; //导入路由包
// 将路由router单独成一个router.js文件
Vue.use(VueRouter); //安装使用
// 导入home member search shopping共4个组件
import home from './components/home/Home.vue';
import member from './components/home/Member.vue';
import shopping from './components/home/Shopping.vue';
import search from './components/home/Search.vue';
var router = new VueRouter({
    routes: [
        {
            path: '/home',
            component: home,
        },
        {
            path: '/member',
            component: member,
        },
        {
            path: '/shopping',
            component: shopping,
        },
        {
            path: '/search',
            component: search,
        },
    ],
});
var vm = new Vue({
    el: '#app',
    data: {},
    methods: {},
    render(h) {
        return h(app);
    },
    // 路由组件要挂载在vm实例中
    router,
});
console.log(vm);
