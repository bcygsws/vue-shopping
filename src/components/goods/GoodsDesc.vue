<template>
	<div class="goodsdesc_container">
		<!-- <h3>这是图文详情组件</h3> -->
		<!-- 图文详情 -->
		<h3>{{ goodsDescInfo.title }}</h3>
		<hr />
		<div class="content" v-html="goodsDescInfo.content"></div>
	</div>
</template>

<script>
import Toast from 'mint-ui';
export default {
	data() {
		return {
			// 当前商品id
			goodsId: this.$route.params.id,
			// 商品图文详情列表数据
			goodsDescInfo: {},
		};
	},
	created() {
		this.getGoodsDesc();
	},
	methods: {
		// 获取商品图文详情数据
		getGoodsDesc() {
			this.$http.get(`api/goods/getdesc/${this.goodsId}`).then(result => {
				console.log(result);
				if (result.body.status !== 0) {
					return Toast('获取图文详情数据失败');
				} else {
					this.goodsDescInfo = result.body.message[0];
				}
			});
		},
	},
};
</script>

<style lang="less" scoped>
.goodsdesc_container {
	padding: 7px;
	h3 {
		color: #26a2ff;
		line-height: 25px;
		font-size: 16px;
		text-align: center;
	}
	/* 样式不生效，使用/deep/,而且不会污染使用相同组件的公共样式 */
	/deep/ .content {
		> p {
			text-indent: 2rem;
			line-height: 20px;
		}
		> p[align='center'] {
			margin: 0;
			img {
				display: block;
				width: 100%;
			}
		}
	}
}
</style>
