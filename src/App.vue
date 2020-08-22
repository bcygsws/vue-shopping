<template>
  <div class="container">
    <mt-header fixed title="学无止境-网课随心购"></mt-header>
    <!-- <h1>这是App组件</h1> -->
    <!-- 这是tabbar按钮 -->
    <nav class="mui-bar mui-bar-tab">
      <!-- 在router.js中也自定义一个mui-active后，必须删除其中默认的类样式mui-active,否则会出现同时选中home和其他三个之一共两个按钮显示选中蓝色的情况 -->
      <router-link class="mui-tab-item2" to="/home">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link class="mui-tab-item2" to="/member">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>
      <router-link class="mui-tab-item2" to="/shopping">
        <span class="mui-icon-extra mui-icon-extra-cart">
          <span class="mui-badge" id="badge">
            {{ $store.getters.getAllGoodsCount }}
          </span>
        </span>
        <!-- <span class="mui-icon-extra mui-icon-extra-cart"></span> -->
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link class="mui-tab-item2" to="/search">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
.container {
  padding-top: 40px;
  padding-bottom: 50px;
}
.mui-bar .mui-icon-extra {
  font-size: 24px;
  position: relative;
  z-index: 20;
  padding-top: 10px;
  padding-bottom: 10px;
}
.mui-bar-tab .mui-tab-item2 .mui-icon-extra {
  top: 3px;
  width: 24px;
  height: 24px;
  padding-top: 0;
  padding-bottom: 0;
}
.mui-bar-tab .mui-tab-item2 .mui-icon-extra ~ .mui-tab-label[data-v-7ba5bd90] {
  font-size: 11px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
}
/* 徽章badge */
.mui-icon-extra .mui-badge {
  font-size: 10px;
  line-height: 1.4;
  position: absolute;
  top: -2px;
  left: 100%;
  margin-left: -10px;
  padding: 1px 5px;
  color: #fff;
  background: red;
}
/* mui-active在router文件中设定，和routes是同级属性。来设置一个选中路由时的类名，在router.js中已经定义了
    linkActiveClass:'mui-active',此处自定义了mui-active,同时也是对App.vue（覆盖后删掉第一个router-link标签中的
    mui-active类样式，否则会出现选择非home按钮时，出现两个按钮选中蓝色的情况）中默认的mui-active进行覆盖。
     */
.mui-bar-tab .mui-tab-item2.mui-active {
  color: #007aff;
}
/* 
    六宫格实现后，出现bug。tabbar按钮的路由不能切换了，仅仅实现了点击某个按钮，显示蓝色背景，url地址栏路由不能随点击按钮切换，
    而始终停留在/home。解决办法是：将mui-tab-item类样式置换掉，改为mui-tab-item2。如此一来，原来的和mui-tab-item有关系的
    样式全部置换成mui-tab-item2
*/
/* a链接 */
.mui-bar-tab .mui-tab-item2 {
  display: table-cell;
  overflow: hidden;
  width: 1%;
  height: 50px;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #929292;
}
/* 第一个span */
.mui-bar-tab .mui-tab-item2 .mui-icon {
  top: 3px;
  width: 24px;
  height: 24px;
  padding-top: 0;
  padding-bottom: 0;
}
/* 第二个span */
.mui-bar-tab .mui-tab-item2 .mui-icon ~ .mui-tab-label {
  font-size: 11px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
}
/*购物车原本样式*/
/* 去掉mui-icon之前相关的样式，和mui-icon-extra现有样式对比*/
/* .mui-icon {
        font-family: Muiicons;
        font-size: 24px;
        font-weight: 400;
        font-style: normal;
        line-height: 1;
        display: inline-block;
        text-decoration: none;
        -webkit-font-smoothing: antialiased;
    }
    .mui-bar .mui-icon {
        font-size: 24px;
        position: relative;
        z-index: 20;
        padding-top: 10px;
        padding-bottom: 10px;
    }
    .mui-bar-tab .mui-tab-item .mui-icon {
        top: 3px;
        width: 24px;
        height: 24px;
        padding-top: 0;
        padding-bottom: 0;
    }

    .mui-bar-tab .mui-tab-item .mui-icon ~ .mui-tab-label[data-v-7ba5bd90] {
        font-size: 11px;
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .mui-icon .mui-badge {
        font-size: 10px;
        line-height: 1.4;
        position: absolute;
        top: -2px;
        left: 100%;
        margin-left: -10px;
        padding: 1px 5px;
        color: #fff;
        background: red;
    } */
</style>
