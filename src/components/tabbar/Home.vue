<template>
  <div class="container">
    <!-- <h1>这是home组件</h1> -->
    <!-- home主页内的轮播图 -->
    <!-- <mt-swipe :auto="4000">
      <mt-swipe-item>
        <img src="../../images/menu1.png" />
      </mt-swipe-item>
      <mt-swipe-item>
        <img src="../../images/menu1.png" />
      </mt-swipe-item>
      <mt-swipe-item>
        <img src="../../images/menu1.png" />
      </mt-swipe-item>
    </mt-swipe> -->
    <swipe :lunbo="lunboList" :isfull="true"></swipe>
    <!-- 六宫格，又九宫格改造而来 -->
      <ul class="mui-table-view mui-grid-view mui-grid-9">
        <li class="mui-table-view-cell mui-media mui-col-xs-4">
          <a href="#">
            <img src="../../images/menu1.png" alt="" />
            <div class="mui-media-body">教育新闻</div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4">
          <a href="#">
            <img src="../../images/menu2.png" alt=""/></img>
            <div class="mui-media-body">课程分享</div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4">
          <a href="#">
            <img src="../../images/menu3.png" alt="">
            <div class="mui-media-body">书籍购买</div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4">
          <a href="#">
            <img src="../../images/menu4.png" alt="">
            <div class="mui-media-body">留言反馈</div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4">
          <a href="#">
            <img src="../../images/menu5.png" alt="">
            <div class="mui-media-body">视频专区</div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4">
          <a href="#">
            <img src="../../images/menu6.png" alt="">
            <div class="mui-media-body">联系我们</div>
          </a>
        </li>
      </ul>
    </div>
</template>

<script>
import { Toast } from "mint-ui";
import swipe from "../subcomponents/Swipe.vue";
export default {
  data() {
    return {
      lunboList: [],
    };
  },
  // 获取生命周期
  created() {
    this.getLunBo();
  },
  methods: {
    getLunBo() {
      this.$http.get("api/getlunbo").then((result) => {
        if (result.status == 200) {
          console.log(result.body.message);
          this.lunboList = result.body.message;
        } else {
          // 请求失败---使用Toast组件提示加载失败
          Toast("加载图片失败……");
        }
      });
    },
  },
  components: {
    swipe,
  },
};
</script>

<style lang="less" scoped>
.container{
.mui-grid-view{
  background-color: #fff;
    li.mui-media{
      background-color: #fff;
      border: 0;
      a{
        img{
          width: 60px;
          height: 60px;
          vertical-align: bottom;
        }
        .mui-media-body{
          font-size: 13px;
        }
      }
    }
  }
}
  
</style>
