<template>
  <div class="photoinfo_container">
    <!-- <h4>这是图片列表详情组件</h4> -->
    <h3>{{ imgInfo.title }}</h3>
    <p class="time_click">
      <span>发表时间：{{ imgInfo.add_time | dateFormat }}</span>
      <span>点击次数：{{ imgInfo.click }}</span>
    </p>
    <hr />
    <!--缩略图区域  安裝vue-preview,在main.js中安装包vue-preview,并使用use方法注册到Vue中-->
    <!--使用步骤：
    1.插件已经更新，img这种标签已经不能使用了，使用vue-preview标签。参考：https://blog.csdn.net/qq_36742720/article/details/83270636
    2.除了为图片添加w、h属性外，还要添加msrc属性，item.msrc=item.src,
    ../lib/css/gloabal.css样式文件也需要书写，并导入main.js文件中
    -->
    <div class="thumbs">
      <vue-preview :slides="thumbsList"></vue-preview>
    </div>
    <div class="content" v-html="imgInfo.content"></div>
    <!--评论列表-->
    <cmt-box :listid="imgId"></cmt-box>
  </div>
</template>

<script>
import comment from "../subcomponents/Comment.vue";
export default {
  data() {
    return {
      // 图片评论列表id
      imgId: this.$route.params.id,
      // 存储缩略图图片信息的数组
      thumbsList: [],
      //   存储图片详情的对象
      imgInfo: {},
    };
  },
  created() {
    this.getImgInfo();
    this.getThumbImg();
  },
  methods: {
    // 获取图片内容详情方法-getImgInfo
    getImgInfo() {
      this.$http.get("api/getimageInfo/" + this.imgId).then((result) => {
        if (result.status == 200) {
          console.log(result.body.message);
          this.imgInfo = result.body.message[0];
        }
      });
    },
    // 获取缩略图数组
    getThumbImg() {
      this.$http.get("api/getthumimages/" + this.imgId).then((result) => {
        if (result.status == 200) {
          console.log(result.body.message);
          result.body.message.forEach((item) => {
            // 设置在vue-preview 全屏浏览时的宽和高
            item.w = 600;
            item.h = 600;
            item.msrc = item.src;
            this.thumbsList.push(item);
          });
          this.thumbsList = result.body.message;
        }
      });
    },
  },
  components: {
    // 注册评论子组件
    "cmt-box": comment,
  },
};
</script>

<style lang="less" scoped>
.photoinfo_container {
  padding: 5px;
  h3 {
    margin: 5px 0;
    text-align: center;
    font-size: 14px;
    color: #007aff;
  }
  .time_click {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    > span {
      font-size: 12px;
      color: #666;
    }
  }
  /* 内容详情文本 */
  .content {
    font-size: 13px;
    text-indent: 2rem;
    line-height: 25px;
  }
}
</style>
