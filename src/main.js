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

/* 除了mint-ui中蓝夹子啊，也可以使用vue提供的懒加载包 vue-lazyload
参考：https://www.cnblogs.com/crazycode2/p/8734013.html
*/
// 为了真正实现图片懒加载的效果，需要全局引入mint-ui包
// a.导入包
// import MintUI from "mint-ui";
// // b.导入样式文件
// import "mint-ui/lib/style.css";
// // c.注册到vue中
// Vue.use(MintUI);
// d.配置babelrc文件
/* 
  在.babelrc中plugins属性中配置以下代码,这是引入mint-ui组件需要的配置：
["component", [
{"libraryName":"mint-ui","style":true}
]]
*/
//使用vue-lazyload包实现懒加载
import VueLazyLoad from "vue-lazyload";
Vue.use(VueLazyLoad);
import { Header, Swipe, SwipeItem, Button, Switch } from "mint-ui";
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);
Vue.component(Switch.name, Switch);
// a.使用图片懒加载技术---但是懒加载不起作用。解决办法：全局导入mint-ui包，而不是按需导入
// import { Lazyload } from "mint-ui";
// Vue.use(Lazyload);
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
// 定义post请求提交表单的数据格式，默认为application/x-www-form-urlencoded。在post请求处是this.$http.post()的第三个参数
Vue.http.options.emulateJSON = true;
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
Vue.filter("dateFormat", function(datastr, pattern = "YYYY-MM-DD HH:mm:ss") {
  return Moment(datastr).format(pattern);
});
// 缩略图要用到的包vue-preview
// a.导入包
import VuePreview from "vue-preview";
// b.默认方式安装到Vue
Vue.use(VuePreview);
// c.导入缩略图样式文件
import "./lib/css/global.scss";

// 任何组件都可以访问全局转态，任何组件也都可以修改全局状态，所有引用全局转态的视图都会响应这种改变，这就是vuex的功能
// a.导包
import Vuex from "vuex";
// b.注册到vue实例
Vue.use(Vuex);
// c.实例化store状态管理对象
// d.在vm实例中引入store

// 注意Vuex的Store()方法，Store大写
// 从本地存储localStorage中获取car数组
var car = JSON.parse(localStorage.getItem("car") || "[]");
var store = new Vuex.Store({
  state: {
    //作用：存放共享的数据，类似组件中的data。组件中引用方式this.$store.state.***
    // car存放共享数据的数组对象
    car: car,
  },
  mutations: {
    // 提交状态修改。组件中引用方式：this.$store.commit(方法名，传递过来的参数，成为mutations方法的第二个参数，第一个参数一定是state)
    addToCar(state, goodsinfo) {
      // 点击【加入购物车按钮】需要购买的商品信息-存放于goodsinfo中，就会被提交到car数组中
      /* 
        分两种情况：
        1.car中已经有将要提交的商品种类(id相同)，则需要将该种类的原有count和即将添加的count相加
        2.car中没有将要提交的商品种类(要提交的id和car中的所有id都不相同)，直接push到car中即可
      */
      var flag = false;
      state.car.some((item) => {
        // 1.some方法找到条件满足的，就将结束遍历,此时原来car数组中，只有count键的值发生改变。若组件传入的goodsinfo中id都不能在car数组
        // 对象中找到，需要为car数组push一个新元素goodsinfo
        // 2.不能直接else分支来实现“car中没有将要提交的商品种类”。如：car数组中有[{id:1},{id:2}],而goodsinfo对象{id:2}，就会发生数组的覆盖
        // 为此，增设一个flag标志，使得上面分析的两种情况彻底分开
        if (item.id == goodsinfo.id) {
          item.count += goodsinfo.count;
          flag = true;
        }
        // else {
        //   state.car.push(goodsinfo);
        // }
        return true;
      });
      // 第二种情况
      if (!flag) {
        state.car.push(goodsinfo);
      }
      // 上面的操作都改变了car值：分别是改变了car的count键值和元素个数
      localStorage.setItem("car", JSON.stringify(state.car));
    },
  },
  getters: {},
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
  // 装载状态管理对象
  store,
});
console.log(vm);
