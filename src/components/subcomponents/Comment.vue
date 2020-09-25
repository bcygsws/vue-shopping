<template>
  <div class="cmt_container">
    <h3>发表评论</h3>
    <!--textarea中v-model中指令绑定msg,msg就是textare中输入的内容，v-model的本质就是处理表单元素和组件的。
    相当于给它绑定了一个@input事件实时监听输入的内容，并把从input事件参数event.target.value中得到的值实时赋给msg,VM接收
    到数据变化，也就实时渲染{{msg}}-->
    <textarea
      name=""
      id=""
      cols="30"
      rows="10"
      placeholder="请输入评论内容（不超过140字）"
      v-model="msg"
    ></textarea>
    <mt-button type="primary" @click="comitComment">发表评论</mt-button>
    <!--评论列表-->
    <dl v-for="(item, index) in cmtlist" :key="'item.add_time' + index">
      <dt>
        <span>第{{ index + 1 }}楼</span>
        <span>用户名：{{ item.user_name }}</span>
        <span>发表时间：{{ item.add_time | dateFormat }}</span>
      </dt>
      <dd v-html="item.content"></dd>
    </dl>
    <mt-button type="danger" plain @click="getMore">加载更多</mt-button>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      // 存储评论列表数组
      cmtlist: [],
      msg: "",
      // 默认加载第一页的内容，即pageIndex=1
      pageIndex: 1,
    };
  },
  // 从newsinfo父组件中获取id值，给子组件comment
  props: ["listId"],

  methods: {
    // 获取评论列表
    getCommentList() {
      this.$http
        // 将pageIndex值用变量表示，当点击【加载更多】按钮时，使得pageIndex值发生变化
        // .get("api/getcomments/" + this.listId + "?pageindex=1")
        .get("api/getcomments/" + this.listId + "?pageindex=" + this.pageIndex)
        .then((result) => {
          if (result.status == 200) {
            console.log(result.body.message);
            // a.第一次默认显示第一页：直接赋值给cmtlist就可以了，等效于第一次获得的数据.concat([])
            // b.第二页时，第二页的数据拼接到上一次的数据前面，于是result.body.message.concat(this.cmtlist)
            // this.cmtlist = result.body.message;
            // c.直到加载完所有页数据，此时result.body.message为[]。[].concat([1,2,3]) 结果是[1,2,3],说明空数组也是concat方法的
            this.cmtlist = result.body.message.concat(this.cmtlist);
          } else {
            Toast("获取评论列表失败……");
          }
        });
    },
    // 提交评论
    comitComment() {
      // 提交信息前，首先要校验textarea框中是否输入了空内容
      if (this.msg.trim().length == 0) {
        Toast("请您先输入评论内容再提交……");
        return; //跳出程序流程
      }
      /* 
      vue的post请求有三个参数：
      参数1：请求URL
      参数2：post请求数据，是一个对象{}。本例中参照接口说明文档，为{content:内容}
      参数3：定义提交表单的数据格式：{emulateJSON:true},默认格式是'application/x-www-form-urlencoded'
      由于项目中多次引用post请求，为此在main.js文件中全局定义提交表单的数据格式

      注意：trim()方法的作用是去除字符串前面和后面的空白字符
       */
      this.$http
        .post("api/postcomment/" + this.listId, { content: this.msg.trim() })
        .then((result) => {
          // 其他地方引用数据接口是，result.status==200，表示获取到了数据；此处是参考数据接口文档进行判断。当result.body.status==0时，表示post提交请求已经顺利完成
          if (result.body.status == 0) {
            // post请求发送成功
            // 阻止一个数据对象，用于渲染
            var dataObj = {
              add_time: Date.now(),
              user_name: "匿名用户",
              content: this.msg.trim(),
            };
            this.cmtlist.unshift(dataObj);
            // 提交评论后，清空文本域中的内容，方便下次输入评论
            this.msg = "";
          }
        });
    },
    // 加载更多
    getMore() {
      this.pageIndex++;
      this.getCommentList();
    },
  },
  created() {
    this.getCommentList();
  },
};
</script>

<style lang="less" scoped>
.cmt_container {
  width: 100%;
  padding: 0 7px;
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
      font-size: 13px;
      margin-left: 30px;
      padding: 10px 0;
    }
  }
  .mint-button--primary{
    margin-bottom: 15px;
  }
}
</style>
