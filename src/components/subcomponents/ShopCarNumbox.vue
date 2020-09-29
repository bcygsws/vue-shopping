<template>
	<div>
		<!-- maxVal是计算属性，定义库存值，因为是computed中监控的变量，需要动态绑定 -->
		<div class="mui-numbox" data-numbox-min="1" :data-numbox-max="maxVal">
			<button class="mui-btn mui-btn-numbox-minus" type="button">
				-
			</button>
			<!-- 点击购物车列表中的+、-和更改值，实质都是value属性值发生改变，用@change事件监听 -->
			<input id="test" class="mui-input-numbox" type="number" :value="curVal" ref="numbox" @change="countChanged" />
			<button class="mui-btn mui-btn-numbox-plus" type="button">
				+
			</button>
		</div>
	</div>
</template>

<script>
// numbox手动初花时，必须再次引入mui.min.js文件,否则报错：mui未定义
import mui from '../../mui/js/mui.min.js';
export default {
	// curVal是购物车订单Shopping.vue中传入的当前值
	props: ['curVal', 'goodsId'],
	created() {
		console.log(typeof this.$store.getters.getAllGoodsQuantity[this.goodsId]);
	},
	mounted() {
		mui('.mui-numbox').numbox();
		// 获取父组件goodsinfo传递过来的库存量，即数字输入框的最大值
		/*
        然而，拿到的父组件传过来的值maxVal却是undefined？
        原因：maxVal是父组件goodsinfo通过ajax请求从 getOrderDesc()方法中获取。由于ajax请求是异步的，父组件从getOrderDesc()
        请求数据的过程中，DOM元素刚刚完成模板的编译，并挂载在页面上。事实上，父组件还没拿到请求数据。因此， orderShow为空对象{}，
        空对象中就拿不到max属性，输出undefined

        a.那么，问题聚焦到“如何做到父组件何时拿到数据了，再来设置maxVal值？反正数字输入框中，渲染的是默认值value="1" ”。最大值maxVal
        请求到了，再行手动设置
        b.使用vue实例的watch属性，来监听属性值maxVal的变化。watch的作用：一般用来监听路由和文本输入框中值的特殊处理，适合的场景是一个值
        影响多个值
    */
		console.log(this.maxVal); //undefined
	},
	// 手动初始化mui后，先监听父组件的传值maxVal，并使用mui API动态设置文本输入框最大值。还需要拿到文本输入框中的实时值(某件商品的件数)。
	// 使用input 的change方法监听input中值的变化
	computed: {
		maxVal() {
			return this.$store.getters.getAllGoodsQuantity[this.goodsId];
		},
	},
	methods: {
		countChanged() {
			// 向store仓库提交count状态改变的请求
			this.$store.commit('updateSelectedCount', {
				id: this.goodsId,
				// 注意：count值不能使用this.curVal，这个值由父组件传递而来，子组件无权更改。子组件可以通过 原生对象value属性的方式获取当前值
				count: this.$refs.numbox.value,
			});
		},
	},
};
</script>

<style lang="less" scoped></style>
