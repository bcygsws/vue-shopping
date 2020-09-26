<template>
	<div class="goodsinfo_container">
		<!-- <h3>这是商品详情页</h3> -->
		<!--【添加购物车】按钮点击时，小球飞向购物车动画
    vue实现动画的三种方式：1.v-enter v-enter-active 6个类，transition设置name数值，name属性值代替默认的v
    2.animate.css 结合enter-active-class和leave-active-class类样式
    3.使用钩子函数，本例中是半场动画，采用钩子函数
    -->
		<transition @before-enter="beforeEnter" @enter="enter" @afterEnter="afterEnter">
			<div class="ball" v-show="ballFlag" ref="ball"></div>
		</transition>
		<!-- 商品详情页轮播图子组件 -->
		<!-- 使用mui 的card.html中的组件 -->
		<div class="mui-card">
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<image-swipe :lunbo="goodsLunBo" :isfull="false"></image-swipe>
				</div>
			</div>
		</div>
		<!--订单详情展示  -->
		<div class="mui-card">
			<div class="mui-card-header">{{ orderShow.title }}</div>
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<div class="price">
						<span>市场价：￥{{ orderShow.market_price }}</span>
						销售价：<span>￥{{ orderShow.sell_price }}</span>
					</div>
					<div class="purNum">
						<span>购买数量:</span>
						<!--使用mui中封装的组件 numbox.html，该组件需要手动初始化-->
						<number-box :maxVal="orderShow.stock_quantity" @getCount="getSelectedCount"></number-box>
					</div>
					<div class="purBtn">
						<mt-button type="primary">立即购买</mt-button>
						<!--文本输入框中最大值监听，动态设置后，实现'加入购物车'的点击事件-->
						<mt-button type="danger" @click="addToShopcar">加入购物车</mt-button>
					</div>
				</div>
			</div>
		</div>
		<!-- 商品参数 -->
		<div class="mui-card">
			<div class="mui-card-header">商品参数</div>
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<p>商品货号：{{ orderShow.goods_no }}</p>
					<p>库存情况：{{ orderShow.stock_quantity }}</p>
					<p>上架时间：{{ orderShow.add_time | dateFormat }}</p>
				</div>
			</div>
			<div class="mui-card-footer">
				<mt-button type="primary" plain @click="getGoodsDesc(goodsId)">图文介绍</mt-button>
				<mt-button type="danger" plain @click="getGoodsComment(goodsId)">商品评论</mt-button>
			</div>
		</div>
	</div>
</template>

<script>
import swipe from '../subcomponents/Swipe.vue';
// 导入“数字输入框”子组件numbox
import numbox from '../subcomponents/GoodsInfoNumberBox.vue';
export default {
	data() {
		return {
			// 从路由中获取商品种类id
			goodsId: this.$route.params.id,
			// 存放轮播图数组
			goodsLunBo: [],
			// 订单详情展示数据对象
			orderShow: {},
			// 默认购买件数为1，也恰好是文本输入框中设置的默认值
			selectedCount: 1,
			// 购物车小球动画的显示/隐藏状态
			ballFlag: false,
			//
		};
	},
	created() {
		this.getThumLunBo();
		this.getOrderDesc();
		console.log(this.$route);
	},
	// 手动初始化number box 数字输入框
	methods: {
		//  获取商品轮播图数组，需要经过处理，以适配Swipe中的item.img,直接拿到的数组对象里只有src属性，没有img属性
		getThumLunBo() {
			// 数据接口还是轮播图中的路径，只是传入不同的id
			this.$http.get('api/getthumimages/' + this.goodsId).then(result => {
				// console.log(result.body.message);
				// 直接赋值轮播图不显示，原因是：swipe组件中轮播图片数组中对象是img属性，而本数组中对象是src属性，需要对数组进行处理一下
				result.body.message.forEach(item => {
					item.img = item.src;
					this.goodsLunBo.push(item);
				});
			});
		},
		// 获取订单展示详情
		getOrderDesc() {
			this.$http.get('api/goods/getinfo/' + this.goodsId).then(result => {
				console.log(result.body.message);
				this.orderShow = result.body.message[0];
			});
		},
		// 获取子组件文本数字框中的实时件数
		getSelectedCount(val) {
			console.log('子组件向父组件传递商品总件数：' + val);
			// 参数val就是子组件向本组件传递的实时件数
			this.selectedCount = val;
		},
		// 点击加入购物车按钮，将选择好的商品加入购物车
		addToShopcar() {
			// 点击【添加到购物车】，购物车小球弹出显示
			this.ballFlag = !this.ballFlag;
			// 组织一个对象,存储即将加入购物车的【商品信息】
			/* 
         {
          即将添加的商品id:this.goodsId,
          即将添加的商品件数count:this.selectedCount,
					即将添加的商品单价price：this.orderShow.sellprice
					商品的库存量,即最大值：this.orderShow.stock_quantity,
          是否选中自动计算价格开关selected：true
          }
          然后，把这个数据保存到store的car中
       */
			var goodsinfo = {
				id: this.goodsId,
				count: this.selectedCount,
				price: this.orderShow.sell_price,
				max: this.orderShow.stock_quantity,
				selected: true,
			};
			// 本组件把数据移交给store中的mutations中方法进行全局管理，引用方式：this.$store.commit()
			this.$store.commit('addToCar', goodsinfo);
		},
		// 动画钩子函数
		beforeEnter(el) {
			el.style.transform = 'translate(0,0)';
		},
		enter(el, done) {
			// 下面语句必须加上，否则没有动画效果
			// 原因在于在vue中（在原生js中也一样），el.style.……定义样式，浏览器不会自动更新的。添加el.offsetWidth,其目的是触发浏览器
			// 重绘，让小球动画显示出来
			el.offsetWidth;
			// 原生对象.getBoundingClientRect()用于获取某个元素相对于视窗的位置集合，IE5就开始支持此方法了
			// a.获取徽标距离视窗的位置集合
			const badgePosition = document.getElementById('badge').getBoundingClientRect();
			// b.获取徽标距离视窗的位置集合
			const ballPosition = this.$refs.ball.getBoundingClientRect();
			// c.小球从数字输入框到徽标的横向和纵向位移距离x、y，使得小球到达徽标位置
			const x = badgePosition.left - ballPosition.left;
			const y = badgePosition.top - ballPosition.top;
			el.style.transform = `translate(${x}px,${y}px)`;
			// d.设置过渡的时间和方式
			el.style.transition = 'all .8s cubic-bezier(.4,-0.3,1,.68)';
			// 调用afterEnter(),类似回调函数
			done();
		},
		afterEnter() {
			this.ballFlag = !this.ballFlag;
		},
		// 点击 图文详情 按钮，跳转至图文详情页面
		getGoodsDesc(id) {
			this.$router.push({ name: 'desc', params: { id: id } });
		},
		//
		getGoodsComment(id) {
			// 点击 商品评论 阿牛，跳转至商品评论页面
			this.$router.push({ name: 'comment', params: { id: id } });
		},
	},
	components: {
		'image-swipe': swipe,
		'number-box': numbox,
	},
};
</script>

<style lang="less" scoped>
.goodsinfo_container {
	width: 100%;
	background-color: #efeff4;
	.mui-card {
		margin-top: 0;
	}
	.mui-card-content-inner {
		> div {
			margin-bottom: 10px;
		}
		.price {
			& :first-child {
				font: normal 400 12px 'Arial';
				color: #666;
				text-decoration: line-through;
				padding: 5px;
				margin-right: 10px;
			}
			& :last-child {
				font: normal 700 16px 'Arial';
				color: #e92312;
				padding: 5px;
			}
		}
		.purNum {
			display: flex;
			flex-direction: row;
			span {
				color: #666;
				line-height: 35px;
				margin-right: 5px;
			}
		}
		.purBtn {
			.mint-button {
				font-size: 14px;
				margin-right: 5px;
				height: 33px;
			}
		}
	}
	.mui-card-footer {
		display: flex;
		flex-direction: column;
		button.mint-button {
			width: 100%;
			margin-bottom: 10px;
			&:last-child {
				margin: 0;
			}
		}
	}
	/* 小球动画 */
	.ball {
		width: 15px;
		height: 15px;
		border-radius: 50%;
		background-color: #e92313;
		position: absolute;
		left: 142px;
		top: 351px;
		z-index: 99;
	}
}
</style>
