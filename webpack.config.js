// 由于 webpack 是基于Node进行构建的，所有，webpack的配置文件中，任何合法的Node代码都是支持的
/* jshint esversion: 6 */
var path = require('path');
// 在内存中，根据指定的模板页面，生成一份内存中的首页，并且能够自动把打包好的bundle注入到页面底部，默认为根目录
//类似如下：<script type="text/javascript" src="bundle.js"></script></body>
// 如果要配置插件，需要在导出的对象中，挂载一个 plugins 节点
var htmlWebpackPlugin = require('html-webpack-plugin');

/* 要在插件plugin中引用vue-loader，版本号用最新的15.9.0,13.3.0中没有plugin.js文件。否则webpack打包时会报错
Module build failed (from ./node_modules/_vue-loader@13.7.3@vue-loader/index.js):
TypeError: Cannot read property 'vue' of undefined
*/
var VueLoaderPlugin = require('vue-loader/lib/plugin');
// 当以命令行形式运行 webpack 或 webpack-dev-server 的时候，工具会发现，我们并没有提供 要打包 的文件的 入口 和 出口文件，此时，他会检查项目根目录中的配置文件，并读取这个文件，就拿到了导出的这个 配置对象，然后根据这个对象，进行打包构建
module.exports = {
	entry: path.join(__dirname, './src/main.js'), // 入口文件
	output: {
		// 指定输出选项
		path: path.join(__dirname, './dist'), // 指定打包输出的bundle.js文件存放路径
		filename: 'bundle.js', // 指定输出文件的名称
		// publicPath: '/dist'//用来指定图片等静态资源的发布地址，包括bundle.js文件，不写默认打包到根目录，在打包文件index.html中查看
	},
	plugins: [
		// 所有webpack  插件的配置节点
		new htmlWebpackPlugin({
			template: path.join(__dirname, './src/index.html'), // 指定模板文件路径
			filename: 'index.html', // 设置生成的内存页面的名称
		}),
		new VueLoaderPlugin(),
	],
	module: {
		// 配置所有第三方loader 模块的
		rules: [
			// 第三方模块的匹配规则
			{ test: /\.css$/, use: ['style-loader', 'css-loader'] }, // 处理 CSS 文件的 loader
			{ test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] }, // 处理 less 文件的 loader
			{
				test: /\.scss|sass$/,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			}, // 处理 scss 文件的 loader
			{
				test: /\.(jpg|png|gif|bmp|jpeg)$/,
				use: 'url-loader?limit=7631&name=[hash:8]-[name].[ext]',
			}, // 处理 图片路径的 loader
			// limit 给定的值，是图片的大小，单位是 byte， 如果我们引用的 图片，大于或等于给定的 limit值，则不会被转为base64格式的字符串， 如果 图片小于给定的 limit 值，则会被转为 base64的字符串
			{ test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader' }, // 处理 字体文件的 loader
			{ test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }, // 配置 Babel 来转换高级的ES语法
			{ test: /\.vue$/, use: 'vue-loader' }, // 处理 .vue 文件的 loader
		],
	},
	resolve: {
		alias: {
			// 修改 Vue 被导入时候的包的路径
			vue$: 'vue/dist/vue.js',
		},
	},
	/* 
  问题：使用ngrok映射外网地址，访问时出现Invalid Host header错误
  原因：由于新版的webpack-dev-server出于安全考虑，默认检查hostname，如果hostname不是配置内的，将中断访问
  */
	devServer: {
		disableHostCheck: true,
	},
};
