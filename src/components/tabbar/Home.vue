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

<style lang="less" scoped></style>
