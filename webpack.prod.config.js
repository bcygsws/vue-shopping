// 由于 webpack 是基于Node进行构建的，所有，webpack的配置文件中，任何合法的Node代码都是支持的
const path = require('path');
// html-webpack-plugin的作用：
// 1.在内存中，根据指定的模板，生成index.html并托管在爱内存中。2、能够自动把打包好的bundle注入到页面底部，默认为根目录
const htmlWebpackPlugin = require('html-webpack-plugin');
/* 
1.vue-loder作用：协助webpack处理.vue文件
2.要在插件plugin中引用vue-loader，版本号用最新的15.9.0,在该版本中13.3.0中没有plugin.js文件，而是index.js文件。否则webpack打包时会报错
Module build failed (from ./node_modules/_vue-loader@13.7.3@vue-loader/index.js):
TypeError: Cannot read property 'vue' of undefined
*/
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// 当以命令行形式运行 webpack 或 webpack-dev-server 的时候，工具会发现，我们并没有提供 要打包 的文件的 入口 和 出口文件，此时，他会检查项目根目录中的配置文件，并读取这个文件，就拿到了导出的这个 配置对象，然后根据这个对象，进行打包构建
/* 
clean-webpack-plugin 用于每次打包前，清理上次打包留下的文件夹dist 
1.新版本的webpack声明需要使用解构赋值的方式,该插件变量首字母C最好大写
2.在plugins节点中引入
*/
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// 分离css插件
const miniCssExtractPlugin = require('mini-css-extract-plugin');
// 优化css
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
module.exports = {
	mode: 'production',
	entry: {
		app: path.resolve(__dirname, 'src/main.js'), // 入口文件
		vendors1: ['mint-ui'],
	},
	output: {
		// 1.指定所有打包文件的输出选项
		// 2.必须是绝对路径
		path: path.resolve(__dirname, './dist'), // 指定打包输出的bundle.js文件存放路径
		filename: '[name].[hash:8].js', // 指定输出文件的名称
		// publicPath: '/dist'//用来指定图片等静态资源的发布地址，包括bundle.js文件，不写默认打包到根目录，在打包文件index.html中查看
	},
	plugins: [
		// 所有webpack  插件的配置节点
		new htmlWebpackPlugin({
			template: path.join(__dirname, './src/index.html'), // 指定模板文件路径
			filename: 'index.html', // 设置生成的内存页面的名称
		}),
		new VueLoaderPlugin(),
		// 引入下次打包前，清理前一次打包文件的插件
		new CleanWebpackPlugin(),
		// 抽离css代码插件配置
		// 该插件将src下的less scss css文件从bundle.js中抽离处理，存放在dist下 css/[name].css路径，其中name是入口文件的别名app
		new miniCssExtractPlugin({
			filename: 'css/[name].css',
		}),
	],
	// 抽离包
	optimization: {
		splitChunks: {
			// chunks值为async表示抽离动态加载模块，initial表示抽离同步模块，all都同步和异步模块都生效
			chunks: 'all',
			// 使用缓存组
			cacheGroups: {
				vendors: {
					//抽离第三方插件
					test: /[\\/]node_modules[\\/]/,
					chunks: 'initial',
					name: 'vendors1',
					priority: 10,
					enforce: true,
				},
				// localMui: {
				// 	// 抽离本地文件
				// 	test: path.resolve(__dirname, 'src/mui'),
				// 	chunks: 'initial',
				// 	name: 'mui',
				// 	priority: 10,
				// 	enforce: true,
				// },
			},
		},
	},
	module: {
		// 配置所有第三方loader 模块的
		rules: [
			// 第三方模块的匹配规则
			/* 
			注意：
			1.使用的第三方插件库一般为.css文件，所以不要把.css后缀的文件启用模块化
			2.个人自定义的相关样式文件最好使用.less和.scss文件，把这些后缀的文件启用模块化
			*/
			{
				test: /\.css$/,
				// 注意这里自定义的css文件在src/lib路径下，而不是src
				include: [path.resolve(__dirname, 'src')],
				exclude: /node_modules/,
				use: [
					// miniCssExtractPlugin.loader和style.loader等效
					{ loader: miniCssExtractPlugin.loader },
					// css加载器，能够让webpack识别css代码
					{
						loader: 'css-loader',
						options: {
							modules: {
								// 重新生成的css文件名
								localIndentName: '[name]__[local]--[hash:base64:5]',
							},
						},
					},
					// 为某些css样式自动加上匹配浏览器种类的前缀
					{
						loader: 'postcss-loader',
					},
				],
			},
			// 解析node_modules文件夹中的第三方库的css代码
			{
				test: /\.css$/,
				include: /node_modules/,
				use: [
					// miniCssExtractPlugin.loader和style.loader等效
					{ loader: miniCssExtractPlugin.loader },
					// css加载器，能够让webpack识别css代码
					{
						loader: 'css-loader',
					},
					// 为某些css样式自动加上匹配浏览器种类的前缀
					{
						loader: 'postcss-loader',
					},
				],
			},
			// 处理less文件的loader
			{
				test: /\.less$/,
				include: [path.resolve(__dirname, 'src')],
				exclude: /node_modules/,
				use: [
					{ loader: miniCssExtractPlugin.loader },
					{ loader: 'css-loader' },
					{
						loader: 'less-loader',
						options: {
							// loader的额外参数，配置视loader具体而定，用于解析less和sass的相对路径，需要安装resolve-url-loader插件
							sourceMap: true,
						},
					},
					{
						loader: 'postcss-loader',
					},
				],
			},
			// 处理sass|scss文件的loader
			{
				test: /\.sass|scss$/,
				include: [path.resolve(__dirname, 'src')],
				exclude: /node_modules/,
				use: [
					{ loader: miniCssExtractPlugin.loader },
					{ loader: 'css-loader' },
					{
						loader: 'sass-loader',
						options: {
							// loader的额外参数，配置视loader具体而定，用于解析less和sass的相对路径，需要安装resolve-url-loader插件
							sourceMap: true,
						},
					},
					{
						loader: 'postcss-loader',
					},
				],
			},
			{
				test: /\.(jpg|png|gif|bmp|jpeg)$/,
				// use: 'url-loader?limit=7631&name=[hash:8]-[name].[ext]',
				use: [
					/* 
					1.npm run dev时，走的是webpack-dev-server路线。会将打包入口js文件托管在内存中，同时配合html-webpack-plugin,将index.html文件
					也托管在内存中，并将打包好的js文件追加到body标签底部。对于css中用到的图片文件（background：url('')）也放在了outputPath:'./images'下。此时，路径
					变成了css/images/图片文件
					2.npm run prod时，走的是webpack打包路线，dist/images文件里面存放项目中用到的图片(包括css中引用的图片).而对于css中的用到的文件却放在了dist/css/images里面，
					为此，publicPath:'../images',以使得打包后，url路径能够访问到dist/images里的图片
					*/
					{
						loader: 'url-loader',
						options: {
							outputPath: './images',
							publicPath: '../images',
							// 只有图片真实大小<设定的limit值才会打包成base64文件(limit比最大的文件还大,才能都转化成base64)
							// limit:633360
							// 图片真实大小大于limit值，打包到dist/images中
							// 最小的图片为6519字节，最大的图片为633353字节
							// 打包到dist/images中
							limit: 6000,
						},
					},
				],
			}, // 处理 图片路径的 loader
			// limit 给定的值，是图片的大小，单位是 byte， 如果我们引用的 图片，大于或等于给定的 limit值，则不会被转为base64格式的字符串， 如果 图片小于给定的 limit 值，则会被转为 base64的字符串
			{
				test: /\.(ttf|eot|svg|woff|woff2)$/,
				use: {
					loader: 'url-loader',
					options: {
						outputPath: './mui/fonts',
						publicPath: '../mui/fonts',
						limit: 29280,
					},
				},
			},
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
