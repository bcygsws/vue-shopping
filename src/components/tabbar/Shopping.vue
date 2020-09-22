<template>
  <div class="shopping_container">
    <!--<h1>这是购物组件</h1>-->
    <div class="pur_list">
      <!-- 使用mui card.html中组件 -->
      <div class="mui-card" v-for="(item, i) in orderList" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <!--Switch组件 mint-ui组件，状态改变@change事件-->
            <mt-switch
              v-model="$store.getters.getGoodsSelected[item.id]"
              @change="
                changeSelected(
                  item.id,
                  $store.getters.getGoodsSelected[item.id]
                )
              "
            ></mt-switch>
            <img :src="item.thumb_path" alt="" />
            <dl>
              <dt>{{ item.title }}</dt>
              <dd>
                <span>￥{{ item.sell_price }}</span>
                <!--子组件 数字输入框,父组件向子组件传值-->
                <num-box
                  :curVal="$store.getters.getGoodsCount[item.id]"
                  :goodsId="item.id"
                ></num-box>
                <!--a链接点击@click事件，修饰符prevent来阻止默认行为。删除功能做以下两点：1.该条目从orderList数组中删除，从而重新渲染的购物列表中没有这条数据
                2.向mutations提交一个修改请求，把该条数据从状态仓库数据state中删除-->
                <a href="javascript:;" @click.prevent="removeItem(item.id, i)"
                  >删除</a
                >
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <!--商品结算信息展示-->
      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner mui-computed">
            <dl>
              <dt>总计（不含运费）</dt>
              <dd>
                已勾选商品件数：<span>{{
                  $store.getters.getGoodsCountAndTotal["count"]
                }}</span
                >件，总价<span
                  >￥{{ $store.getters.getGoodsCountAndTotal["total"] }}</span
                >
              </dd>
            </dl>
            <mt-button type="danger">去结算</mt-button>
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
  created() {
    this.getOrderInfo();
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
      this.$http
        .get("api/goods/getshopcarlist/" + idArr.join(","))
        .then((result) => {
          if (result.status == 200) {
            // console.log(result.body.message);
            this.orderList = result.body.message;
          }
        });
    },
    // 做两件事：1.将条目从数组orderList中删除，以使得本页面重新渲染，使得删除的该条目消失
    // 2.向mutations提交一个修改方法和参数，使得状态仓库中该id的数据也同步清除
    removeItem(id, index) {
      // 从本页面渲染数组中清除该id所在条目的内容
      this.orderList.splice(index, 1);
      // 提交一个状态修改请求
      this.$store.commit("removeShopcarItem", id);
    },
    // 更改购物车列表中的switch开关状态。将影响【结算区】的“勾选商品的总件数”以及“商品总价”
    /* 
    参数id:是使得哪个id商品的状态发生改变？
    参数switchVal:是v-model的当前值。对于switch开关打开为true,关闭为false。v-model属性值$store.getters.getGoodsSelected[item.id]这个值随之发生变化
     */
    changeSelected(id, switchVal) {
      console.log(id, switchVal); //将switch开关关闭后，输出值变成了 88 false
      // 同样地，这个修改影响全局状态。向store状态管理仓库提交这个更改
      //提交的是对象{ id: id, selected: switchVal }
      this.$store.commit("updateCarSelected", { id: id, selected: switchVal });
    },
    // 点击数字输入框中的+ - 甚至更改输入框中的值导致car中count值发生改变，可以在ShopCarNumberbox.vue子组件中进行处理
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
              > span {
                font-size: 16px;
                color: #e92312;
                font-weight: 700;
              }
            }
          }
        }
      }
      .mui-computed {
        dl {
          dt {
            margin: 0;
            font-weight: 400;
          }
          dd {
            span {
              color: #e92312;
              font-size: 16px;
            }
          }
        }
        .mint-button {
          height: 35px;
          font-size: 16px;
        }
      }
    }
  }
}
</style>
