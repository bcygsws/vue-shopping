<template>
  <div class="info_container">
    <!-- <h4>这是列表详情组件</h4> -->
    <h3>{{ listinfo.title }}</h3>
    <div class="head_title">
      <span>时间：{{ listinfo.add_time | dateFormat }}</span>
      <span>点击次数：{{ listinfo.click }}</span>
    </div>
    <!--内容区-->
    <p v-html="listinfo.content"></p>
    <comment :listid="id"></comment>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import comment from "../subcomponents/Comment.vue";
export default {
  data() {
    return {
      // 当前页面是id值为多少的条目的信息，从当前页面url地址中获取id,方便数据请求
      id: this.$route.params.id,
      // 存储内容详情对象
      listinfo: {},
    };
  },
  methods: {
    getNewsInfo() {
      this.$http.get("api/getnew/" + this.id).then((result) => {
        if (result.status == 200) {
          console.log(result.body.message);
          this.listinfo = result.body.message[0];
        } else {
          Toast("列表详情加载失败……");
        }
      });
    },
  },
  created() {
    //  测试路由跳转至此页面时的当前id值
    // console.log(this);
    this.getNewsInfo();
  },
  components: {
    comment,
  },
};
</script>
<style lang="less" scoped>
.info_container {
  /* 给内容区加个左右内边距 */
  padding: 0 4px;
  h3 {
    font-size: 16px;
    margin: 15px 0;
    text-align: center;
    color: #e92312;
  }
  .head_title {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
    > span {
      font-size: 12px;
      color: #007af0;
    }
  }
  p {
    text-indent: 2rem;
    /* 设置行间距为30px */
    line-height: 30px;
    padding: 10px 0;
  }
}
</style>
