<template>
  <div class="photo_container">
    <!-- <h2>这是图片列表组件</h2> -->
    <!-- 顶部滑动条，使用mui tab-top-webview-main.html中组件 -->
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <!--默认选中【全部】这个a连接，【全部】的id为0,在获取分类数据后，自己拼接的对象。注意：在移动端中使用tap事件代替click
          事件。click有200·300ms的延迟，移动端用tap代替click，可以解决一些切换bug-->
          <!--<a
            v-for="item in catList"
            :class="['mui-control-item', item.id == 0 ? 'mui-active' : '']"
            href="#item1mobile"
            :key="item.id"
            @click="getImgList(item.id)"
          >-->
          <a
            v-for="item in catList"
            :class="['mui-control-item', item.id == 0 ? 'mui-active' : '']"
            href="#item1mobile"
            :key="item.id"
            @tap="getImgList(item.id)"
          >
            {{ item.title }}
          </a>
        </div>
      </div>
    </div>

    <ul class="img_list">
      <router-link
        v-for="item in photolist"
        :key="item.id"
        tag="li"
        :to="'/home/photoinfo/' + item.id"
      >
        <!--但是对于服务器来说，一上来就加载数十张图片，需要向服务器发送多次请求，这样会增加服务器的压力。同时，如果图片依赖
      js文件，js文件在文档顶部的话，页面的呈现将非常慢，大大影响用户体验。为此，使用懒加载技术来展示图片列表-->
        <!--<img :src="item.img_url" alt="" />-->
        <!--懒加载图片列表后，实现点击图片，跳转到图片详情。改造路由，将li改造为router-link,但是router-link默认渲染成a标签，
        为此为router-link标签添加tag="li"属性，指示router-link标签将渲染成li标签-->
        <img v-lazy="item.img_url" alt="" />
        <dl class="img_content">
          <dt class="img_title">{{ item.title }}</dt>
          <dd class="img_body">{{ item.zhaiyao }}</dd>
        </dl>
      </router-link>
    </ul>
  </div>
</template>
<script>
// 初始化滑动条mui('.mui-scroll-wrapper').scroll()后，提示“Error in mounted hook: "ReferenceError: mui is not defined"”
import mui from "../../lib/mui/js/mui.min";
export default {
  data() {
    return {
      // 存储图片分类的id
      catList: [],
      // 默认加载项【全部】的分类id
      catId: 0,
      // 选中一个a后的存储图片的id
      photolist: [],
    };
  },
  created() {
    this.getImgCate();
  },
  mounted() {
    // mounted钩子函数，是DOM模板编译完成，并挂载到页面上了。页面中的DOM结构被渲染完成时调用
    // 实际上，初始化顶部滑动条，在这个时期，因为此时DOM结构已经渲染到页面上了，屏幕中才能看到
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
    //图片分享--->图片列表展示，默认加载【全部】按钮所展示的图片列表，【全部】分类的id为0，设置为id的默认值
    this.getImgList(this.catId);
  },
  methods: {
    // 获取图片分类id
    getImgCate() {
      this.$http.get("api/getimgcategory").then((result) => {
        if (result.status == 200) {
          console.log(result.body.message);
          // 问题？从数据接口中获取的数据没有全部这个选项。需要自己添加这个选项 {id:0,title:'全部'}
          // this.catList = result.body.message.unshift({ title: "全部", id: 0 });
          // console.log(this.catList);//12 一个数组竟然等于12，问题出在数组unshift的返回值是返回数组的新长度，11+1=12
          // a.在数组前面添加个元素
          result.body.message.unshift({ title: "全部", id: 0 });
          // b.新数组名还是result.body.message
          this.catList = result.body.message;
        }
      });
    },
    // 获取展示图片内容
    getImgList(id) {
      this.$http.get("api/getimages/" + id).then((result) => {
        if (result.status == 200) {
          console.log(result.body.message);
          this.photolist = result.body.message;
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
/* 问题：浏览器下方总是出现警告，诸如：[Intervention] Unable to preventDefault inside passive event listener due to target being treated as passive. See <URL> */
/* 添加下面样式解决 */
* {
  touch-action: pan-y;
}

.photo_container {
  .mui-segmented-control {
    a.mui-control-item.mui-active {
      color: #007aff;
      border-bottom: 0;
      background: 0 0;
    }
  }
  > ul.img_list {
    padding: 0 10px;
    li {
      width: 100%;
      position: relative;
      margin-bottom: 10px;
      /* 加一个阴影效果 */
      box-shadow: 0 0 10px #999;
      /* 图片的显示样式 */
      img {
        width: 100%;
        height: 100%;
        vertical-align: bottom;
      }
      /* 图片加载时的样式 */
      img[lazy="loading"] {
        width: 40px;
        height: 300px;
        margin: auto;
      }
      .img_content {
        position: absolute;
        left: 0;
        bottom: 0;
        font-size: 13px;
        color: #ffffff;
        background: rgba(0, 0, 0, 0.4);
        /* 清除dl的默认外边距 */
        margin: 0;
        /* 设置一个最大高度 */
        max-height: 110px;
        padding: 2px;
        .img_title {
          font-size: 14px;
        }
        .img_body {
          margin-left: 0;
        }
      }
    }
  }
}
/* 懒加载技术，需要的样式如下：放到less结构中去
   然而，仅仅按照mint-ui官方文档，懒加载图片无法显示效果，解决办法，需要在main.js中全局引入mint-ui包
 */
/* img[lazy="loading"] {
  width: 40px;
  height: 300px;
  margin: auto;
} */
</style>
