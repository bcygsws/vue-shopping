<template>
  <!-- 设置滚动条 -->
  <div class="gundong">
    <!-- <h1>这是新闻列表组件</h1> -->
    <!-- 使用mui库中的media-list.html中组件 -->

    <ul class="mui-table-view">
      <li
        class="mui-table-view-cell mui-media"
        v-for="item in newslist"
        :key="item.id"
      >
        <router-link :to="'/home/newslist/' + item.id">
          <img class="mui-media-object mui-pull-left" :src="item.img_url" />
          <div class="mui-media-body">
            <h3>{{ item.title }}</h3>
            <div class="mui-ellipsis">
              <!--在main.js定义全局过滤器格式化时间-->
              <span>发表时间：{{ item.add_time | dateFormat }}</span>
              <span>点击次数：{{ item.click }}次</span>
            </div>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return { newslist: [] };
  },
  methods: {
    getNewsList() {
      this.$http.get("api/getnewslist").then((result) => {
        if (result.status == 200) {
          console.log(result.body.message);
          this.newslist = result.body.message;
        } else {
          Toast("获取新闻列表失败……");
        }
      });
    },
  },
  created() {
    this.getNewsList();
  },
};
</script>

<style lang="less" scoped>
.mui-table-view-cell {
  .mui-media-body {
    > h3 {
      font-size: 14px;
    }
    > div.mui-ellipsis {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      span {
        font-size: 12px;
        color: #007af0;
      }
    }
  }
}
</style>
