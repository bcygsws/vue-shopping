<template>
  <div class="cmt_container">
    <h3>发表评论</h3>
    <textarea
      name=""
      id=""
      cols="30"
      rows="10"
      placeholder="请输入评论内容（不超过140字）"
    ></textarea>
    <mt-button type="primary">发表评论</mt-button>
    <!--评论列表-->
    <dl v-for="(item, index) in cmtlist" :key="'item.add_time' + index">
      <dt>
        <span>第{{ index + 1 }}楼</span>
        <span>用户名：{{ item.user_name }}</span>
        <span>发表时间：{{ item.add_time }}</span>
      </dt>
      <dd v-html="item.content"></dd>
    </dl>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      // 存储评论列表数组
      cmtlist: [],
    };
  },
  // 从newsinfo父组件中获取id值，给子组件comment
  props: ["listid"],

  methods: {
    // 获取评论列表
    getCommentList() {
      this.$http
        .get("api/getcomments/" + this.listid + "?pageindex=1")
        .then((result) => {
          if (result.status == 200) {
            console.log(result.body.message);
            this.cmtlist = result.body.message;
          } else {
            Toast("获取评论列表失败……");
          }
        });
    },
  },
  created() {
    this.getCommentList();
  },
};
</script>

<style lang="less" scoped>
.cmt_container {
  h3 {
    font-size: 18px;
    border-bottom: 1px solid #ccc;
    padding: 5px 0;
  }
  textarea {
    margin-top: 10px;
    width: 100%;
    height: 130px;
    /* 伪元素设置text-area中placeholder字体大小 */
    &::placeholder {
      font-size: 13px;
    }
  }
  button {
    width: 100%;
  }
  dl {
    margin: 5px 0;
    dt {
      background-color: #ccc;
      height: 30px;
      line-height: 30px;
      span {
        font-size: 12px;
        margin-right: 10px;
      }
    }
    dd {
      margin-left: 30px;
      padding: 10px 0;
    }
  }
}
</style>
