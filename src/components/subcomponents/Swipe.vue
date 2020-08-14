<!-- 将轮播图单独抽象一个组件，以方便其他地方复用
1.轮播图Swipe.vue需要在Home.vue中使用，其就成为子组件
2.轮播图中的图片要从父组件home找那个获取，涉及父组件向子组件传值 -->
<template>
  <div class="container">
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="list in lunbo" :key="list.id">
        <!--在首页轮播图中：我们希望轮播图宽度为100%，这样首页展示时，恰好铺平设备的宽度。但是在缩略图，不希望轮播图宽度我100%，
      而是让此时宽度自适应。出现了分歧点，为此需要对轮播图宽度样式进行单独的控制-->
        <img :src="list.img" alt="" :class="{ full: isfull }" />
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: ["lunbo", "isfull"],
};
</script>
<style lang="less" scoped>
.container {
  height: 200px;
  .mint-swipe-items-wrap {
    /* height: 100%; */
    .mint-swipe-item {
      text-align: center;
      img {
        height: 100%;
        vertical-align: bottom;
      }
    }
  }
}
.full {
  width: 100%;
}
</style>
