<template>
  <div class="shopping_container">
    <!--<h1>这是购物组件</h1>-->
    <div class="pur_list">
      <!-- 使用mui card.html中组件 -->
      <div class="mui-card" v-for="item in orderList" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <!--Switch组件 mint-ui-->
            <mt-switch v-model="item.selected"></mt-switch>
            <img :src="item.src" alt="" />
            <dl>
              <dt>{{ item.title }}</dt>
              <dd>
                <span>￥{{ item.price }}</span>
                <!--子组件 数字输入框,父组件向子组件传值-->
                <num-box :curVal="item.count"></num-box>
                <a>删除</a>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 导入numberbox子组件
import numberbox from "../subcomponents/ShopCarNumbox.vue";
export default {
  data() {
    return {
      // 组织的对象orderList,存放购物车商品列表
      orderList: [],
    };
  },
  methods: {
    // 根据car中商品id获取商品的一些信息，部分信息需要根据id获取
    getOrderInfo() {
      // 存放要购买商品种类id的数组
      var idArr = [];
      this.$store.state.car.forEach((item) => {
        idArr.push(item.id);
      });
      //
      idArr.forEach((item, index) => {
        this.$http.get("api/goods/getshopcarlist/" + item).then((result) => {
          if (result.status == 200) {
            console.log(result.body.message);
            var orientInfo = result.body.message[0];
            // 组织一个对象，包含购物车列表中的一个条目的所有信息
            var obj = {
              // 表明唯一身份的id,删除的时候用到
              id: item,
              selected: this.$store.state.car[index].selected,
              src: orientInfo.thumb_path,
              title: orientInfo.title,
              price: orientInfo.sell_price,
              count: this.$store.state.car[index].count,
            };
            this.orderList.push(obj);
          }
        });
      });
    },
  },
  created() {
    console.log(this.car);
    this.getOrderInfo();
  },
  components: {
    "num-box": numberbox,
  },
};
</script>

<style lang="less" scoped>
.shopping_container {
  background-color: #efeff4;
  padding: 10px 0;

  .pur_list {
    //   padding: 1px 0;
    margin: -10px 0;
    .mui-card {
      .mui-card-content-inner {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        img {
          /* 60/355 */
          width: 16.9%;
          height: 16.9%;
          vertical-align: bottom;
        }
        dl {
          dt {
            font-size: 14px;
            line-height: 25px;
            font-weight: 700;
            margin-bottom: 10px;
          }
          dd {
            margin-left: 0;
            &:last-child {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              align-items: center;
              /* 让价格标签、数字输入框、删除标签居中 */
              line-height: 33px;
              >span{
                  font-size: 16px;
                  color: #e92312;
                  font-weight: 700;
              }
            }
          }
        }
      }
    }
  }
}
</style>
