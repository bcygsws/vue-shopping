// 路由相关文件
import VueRouter from 'vue-router';
// 导入home member search shopping共4个组件
const home = () => import(/* webpackChunkName:'tab_chunk' */ '@/tabBar/Home.vue');
const member = () => import(/* webpackChunkName:'tab_chunk' */ '@/tabBar/Member.vue');
const shopping = () => import(/* webpackChunkName:'tab_chunk' */ '@/tabBar/Shopping.vue');
const search = () => import(/* webpackChunkName:'tab_chunk' */ '@/tabBar/Search.vue');
const newsList = () => import(/* webpackChunkName:'newsInfo_list' */ '@/goodsNews/newsList.vue');
const newsInfo = () => import(/* webpackChunkName:'newsInfo_list' */ '@/goodsNews/newsInfo.vue');
const photoList = () => import(/* webpackChunkName:'newsInfo_list' */ '@/photos/photoList.vue');
const photoInfo = () => import(/* webpackChunkName:'newsInfo_list' */ '@/photos/photoInfo.vue');
const goodsList = () => import(/* webpackChunkName:'goods' */ '@/goods/goodsList.vue');
const goodsInfo = () => import(/* webpackChunkName:'goods' */ '@/goods/goodsInfo.vue');
const goodsDesc = () => import(/* webpackChunkName:'goods' */ '@/goods/goodsDesc.vue');
const goodsComment = () => import(/* webpackChunkName:'goods' */ '@/goods/goodsComment.vue');
const videoList = () => import(/* webpackChunkName:'video' */ '@/video/VideoList.vue');
const feedback = () => import(/* webpackChunkName:'feedback' */ '@/feedback/Feedback.vue');
const informUs = () => import(/* webpackChunkName:'inform' */ '@/inform/InformUs.vue');

/* 注意：
vue中path路径默认不区分大小写，在浏览器路由地址中都解析成了小写 
*/
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
			path: '/home/newsList',
			component: newsList,
			meta: {
				title: '新闻资讯',
			},
		},
		{
			path: '/home/newsList/:id',
			component: newsInfo,
			meta: {
				title: '资讯详情',
			},
		},
		{
			path: '/home/photoList',
			component: photoList,
			meta: {
				title: '趣图',
			},
		},
		{
			path: '/home/photoInfo/:id',
			component: photoInfo,
			meta: {
				title: '图片掠影',
			},
		},
		{
			path: '/home/goodsList',
			component: goodsList,
			meta: {
				title: '商品列表',
			},
		},
		{
			name: 'desc',
			path: '/home/goodsDesc/:id',
			component: goodsDesc,
			meta: {
				title: '图文介绍',
			},
		},
		{
			name: 'info',
			path: '/home/goodsInfo/:id',
			component: goodsInfo,
			meta: {
				title: '商品详情',
			},
		},
		{
			name: 'comment',
			path: '/home/goodsComment/:id',
			component: goodsComment,
			meta: {
				title: '商品评论',
			},
		},
		{
			path: '/home/videoList',
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
			path: '/home/informUs',
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
