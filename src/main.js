//入口文件
// console.log('ok');//测试代码
/* jshint esversion:6 */
import Vue from "vue";
// 导入app组件
import app from "./App.vue";
// 导入路由相关文件router.js文件
import router from "./router.js";
// 导入mui所需要的的css和js文件
import "./lib/mui/css/mui.min.css";
// 参照mui官方文档，扩展字体要使用，需要添加
import "./lib/mui/css/icons-extra.css";
import "./lib/mui/fonts/mui-icons-extra.ttf";
import "./lib/mui/js/mui.min.js";
// 固定在顶部栏，要引用Mint UI中的组件
// 导入Swipe组件-轮播图组件
// 请求数据失败 弹框提示组件Toast
import { Header, Swipe, SwipeItem } from "mint-ui";
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
/* 
vue路由的使用过程：1.除了安装使用vue需要的包 vue、vue-loader、vue-template-compiler包，还需要安装vue路由包vue-router
2.导入vue-router包，拿到VueRouter对象，并使用Vue.use注册到vue中
3.在vue实例vm中挂载router
*/
import VueRouter from "vue-router"; //导入路由包
// 将路由router单独成一个router.js文件
Vue.use(VueRouter); //安装使用
import VueResourse from "vue-resource";
Vue.use(VueResourse);
// 涉及了vue请求后台数据，必须先将VueResource注册到Vue中，否则Vue.http.options会报错options没有定义
// 为了增强代码的可维护性：做到一处修改，多处引用。对一个数据接口的主机号+端口号地址，进行全局配置。让其他组件可以共享
Vue.http.options.root = "http://www.liulongbin.top:3005/";
// // 导入home member search shopping共4个组件
// import home from './components/home/Home.vue';
// import member from './components/home/Member.vue';
// import shopping from './components/home/Shopping.vue';
// import search from './components/home/Search.vue';
// var router = new VueRouter({
//     routes: [
//         {
//             path: '/',
//             redirect: '/home',
//         },
//         {
//             path: '/home',
//             component: home,
//         },
//         {
//             path: '/member',
//             component: member,
//         },
//         {
//             path: '/shopping',
//             component: shopping,
//         },
//         {
//             path: '/search',
//             component: search,
//         },
//     ],
// });
import Moment from "moment";
// 格式化的时间在应用中多次用到，我们使用moment包来格式化时间。定义一个一个全局过滤器，以使得各个组件都能引用这个过滤器
/* 
  pattern = "YYYY-MM-DD HH-mm-ss"是为pattern设置了一个默认值，即调用过滤器时，没有带参数的话，参数pattern就是默认值
  如果dateFormat要更改参数，可以在调用时，{{渲染数据 | dateFormat(自己设置的pattern参数值)}}
*/
Vue.filter("dateFormat", function(datastr, pattern = "YYYY-MM-DD HH-mm-ss") {
  return Moment(datastr).format(pattern);
});
var vm = new Vue({
  el: "#app",
  data: {},
  methods: {},
  render(h) {
    return h(app);
  },
  // 路由组件要挂载在vm实例中
  router,
});
console.log(vm);
