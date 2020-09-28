/* jshint esversion:6 */
// 路由相关文件
import VueRouter from 'vue-router';
// 导入home member search shopping共4个组件
import home from './components/tabbar/Home.vue';
import member from './components/tabbar/Member.vue';
import shopping from './components/tabbar/Shopping.vue';
import search from './components/tabbar/Search.vue';
import newslist from './components/goodsnews/NewsList.vue';
import newsinfo from './components/goodsnews/NewsInfo.vue';
import photolist from './components/photos/PhotoList.vue';
import photoinfo from './components/photos/PhotoInfo.vue';
import goodslist from './components/goods/GoodsList.vue';
import goodsinfo from './components/goods/GoodsInfo.vue';
import goodsdesc from './components/goods/GoodsDesc.vue';
import goodscomment from './components/goods/GoodsComment.vue';
import videoList from './components/video/VideoList.vue';
import feedback from './components/feedback/Feedback.vue';
import informUs from './components/inform/Informus.vue';
var router = new VueRouter({
	routes: [
		{
			path: '/',
			redirect: '/home',
			meta: {
				title: '生活宝App',
			},
		},
		{
			path: '/home',
			component: home,
			meta: {
				title: '首页',
			},
		},
		{
			path: '/member',
			component: member,
			meta: {
				title: '会员',
			},
		},
		{
			path: '/shopping',
			component: shopping,
			meta: {
				title: '购物车',
			},
		},
		{
			path: '/search',
			component: search,
			meta: {
				title: '搜索',
			},
		},
		{
			path: '/home/newslist',
			component: newslist,
			meta: {
				title: '新闻资讯',
			},
		},
		{
			path: '/home/newslist/:id',
			component: newsinfo,
			meta: {
				title: '资讯详情',
			},
		},
		{
			path: '/home/photolist',
			component: photolist,
			meta: {
				title: '趣图',
			},
		},
		{
			path: '/home/photoinfo/:id',
			component: photoinfo,
			meta: {
				title: '图片掠影',
			},
		},
		{
			path: '/home/goodslist',
			component: goodslist,
			meta: {
				title: '商品列表',
			},
		},
		{
			name: 'desc',
			path: '/home/goodsdesc/:id',
			component: goodsdesc,
			meta: {
				title: '图文介绍',
			},
		},
		{
			name: 'info',
			path: '/home/goodsinfo/:id',
			component: goodsinfo,
			meta: {
				title: '商品详情',
			},
		},
		{
			name: 'comment',
			path: '/home/goodscomment/:id',
			component: goodscomment,
			meta: {
				title: '商品评论',
			},
		},
		{
			path: '/home/videolist',
			component: videoList,
			meta: {
				title: '视频专区',
			},
		},
		{
			path: '/home/feedback',
			component: feedback,
			meta: {
				title: '留言反馈',
			},
		},
		{
			path: '/home/informus',
			component: informUs,
			meta: {
				title: '联系我们',
			},
		},
	],
	// 在VueRouter对象中，和routes并列的属性，还有一个linkActiveClass。该属性不设置的时候，路由选中的时候，路由配置好将添加一个默认的排他的router-link-active属性。而一旦设置linkActiveClass为其他值，router-link-active将不复存在，取而代之的是设定值，本例中是mui-active
	linkActiveClass: 'mui-active',
});
console.log(router);
export default router;
