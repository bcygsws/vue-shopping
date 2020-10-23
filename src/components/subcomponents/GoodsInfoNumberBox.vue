<template>
	<div>
		<!-- <div
      class="mui-numbox"
      data-numbox-min="1"
      :data-numbox-max="orderShow.stock_quantity"
    > -->
		<div class="mui-numbox" data-numbox-min="1">
			<button class="mui-btn mui-btn-numbox-minus" type="button">
				-
			</button>
			<!-- 页面刷新 文本输入框中初始值将又变成1 -->
			<input id="test" class="mui-input-numbox" type="number" value="1" ref="numbox" @change="countChanged" />
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
	// maxVal 是父组件goodsInfo传递过来的值
	props: ['maxVal'],
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
	// vue官方文档关于watch:大多数情况下我们使用计算属性能计算这种变化。但是，当需要在数据变化时，执行异步操作或者开销较大的请求时，这种方式是有效的
	watch: {
		//这个maxVal是props中接收的属性
		maxVal: function(newVal, oldVal) {
			//使用mui官方文档中mui的API来设置max的值
			//setOptions(options) 可取值: min(Int),step(Int),max(Int),下面的max是指文本输入框的最大值，这是固定写法，注意和监控属性max的区别
			mui('.mui-numbox')
				.numbox()
				.setOption('max', newVal);
		},
	},
	// 手动初始化mui后，先监听父组件的传值maxVal，并使用mui API动态设置文本输入框最大值。还需要拿到文本输入框中的实时值(某件商品的件数)。
	methods: {
		// 使用input 的change方法实时监听input中值的变化
		countChanged() {
			// ref---this.$refs可以获取原生DOM对象
			// 当前value值 this.$refs.numbox.value,需要传给父组件
			// console.log(this.$refs.numbox.value);
			this.$emit('getCount', this.$refs.numbox.value);
		},
	},
};
</script>

<style lang="less" scoped></style>
