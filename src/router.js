/* jshint esversion:6 */
// 路由相关文件
import VueRouter from "vue-router";
// 导入home member search shopping共4个组件
import home from "./components/tabbar/Home.vue";
import member from "./components/tabbar/Member.vue";
import shopping from "./components/tabbar/Shopping.vue";
import search from "./components/tabbar/Search.vue";
import newslist from "./components/goodsnews/NewsList.vue";
import newsinfo from "./components/goodsnews/NewsInfo.vue";
import photolist from "./components/photos/PhotoList.vue";
import photoinfo from "./components/photos/PhotoInfo.vue";
var router = new VueRouter({
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/home",
      component: home,
    },
    {
      path: "/member",
      component: member,
    },
    {
      path: "/shopping",
      component: shopping,
    },
    {
      path: "/search",
      component: search,
    },
    {
      path: "/home/newslist",
      component: newslist,
    },
    {
      path: "/home/newslist/:id",
      component: newsinfo,
    },
    {
      path: "/home/photolist",
      component: photolist,
    },
    {
      path: "/home/photoinfo/:id",
      component: photoinfo,
    },
  ],
  // 在VueRouter对象中，和routes并列的属性，还有一个linkActiveClass。该属性不设置的时候，路由选中的时候，路由配置好将添加一个默认的排他的router-link-active属性。而一旦设置linkActiveClass为其他值，router-link-active将不复存在，取而代之的是设定值，本例中是mui-active
  linkActiveClass: "mui-active",
});
console.log(router);
export default router;
