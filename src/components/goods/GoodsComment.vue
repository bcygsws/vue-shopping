<template>
	<div>
		<comment :listId="goodsId"></comment>
	</div>
</template>

<script>
import desComments from '../subcomponents/Comment.vue';
export default {
	data() {
		return {
			goodsId: this.$route.params.id,
		};
	},
	components: {
		comment: desComments,
	},
};
</script>
