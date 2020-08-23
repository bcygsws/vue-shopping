<template>
  <div class="app_container">
    <mt-header fixed title="学无止境-网课随心购">
      <span slot="left" v-show="flag" @click="goBack">
        <mt-button icon="back">返回</mt-button>
      </span>
    </mt-header>
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
    return {
      // 返回按钮的标志位，主页App.vue是最前面的页面，默认将“返回”隐藏
      flag: false,
    };
  },
  methods: {
    goBack() {
      // 点击一次页面中“后退”按钮，返回到上一次，即：go(-1)
      this.$router.go(-1);
    },
  },
  // watch属性监控路由地址的变化，以确定【返回】按钮的显示或隐藏，当路由地址为："/home"表示在home主页，【返回】按钮应隐藏
  // 在其他非"/home"路由时，按钮都应该隐藏
  /* bug:但是即使在非'/home'路由页面，当这些页面刷新时，浏览器都会重绘App.vue页面。flag变量值在watch属性中即使设定flag=true值将会销毁，flag变为默认值false,【返回】按钮
     也将消失，为此使用生命周期钩子。App.vue初始化时，在生命周期钩子created也同样做一个判断，如是非'/home'路由，当页面重绘时，将其flag值
     手动改成true
   */
  created() {
    this.flag = this.$route.path == "/home" ? false : true;
  },
  watch: {
    "$route.path": function(newVal) {
      if (newVal == "/home") {
        this.flag = false;
      } else {
        this.flag = true;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.app_container {
  padding-top: 40px;
  padding-bottom: 50px;
  /* 图片列表页向上卷曲时，由于该页面中顶部滑动栏也采用了定位，而且是在顶部固定栏header后面定义的，会压在header上面，因此需手动提高
     header的层级
   */
  .mint-header {
    z-index: 99;
  }
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
