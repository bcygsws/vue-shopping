<template>
  <div id="photo_container">
    <!-- <h2>这是图片列表组件</h2> -->
    <!-- 顶部滑动条，使用mui tab-top-webview-main.html中组件 -->
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <!--默认选中【全部】这个a连接，【全部】的id为0,在获取分类数据后，自己拼接的对象-->
          <a
            v-for="item in catList"
            :class="['mui-control-item', item.id == 0 ? 'mui-active' : '']"
            href="#item1mobile"
            :key="item.id"
          >
            {{ item.title }}
          </a>
        </div>
      </div>
    </div>

    <ul>
      <li>
        <a href=""><img src="" alt=""/></a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      catList: [],
    };
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
  },
  created() {
    this.getImgCate();
  },
};
</script>
<style lang="less" scoped>
.photo_container {
  .mui-segmented-control.mui-segmented-control-inverted {
    a.mui-control-item.mui-active {
      color: #007aff;
      border-bottom: 0;
      background: 0 0;
    }
  }
}
</style>
