<template>
  <div class="cmt_container">
    <h3>评论列表</h3>
    <textarea
      name=""
      id=""
      cols="30"
      rows="10"
      placeholder="请输入评论内容（不超过140字）"
    ></textarea>
  </div>
</template>
<script>
export default {};
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
}
</style>
