# 学无止境-网课随心购项目
## 分为以下模块：
### 主页的设计
+ 主页的头部栏header（使用mint-ui组件）和切换栏tabbar（使用mui组件）的样式设计
+ tabbar栏的功能切换
   + 在router.js中定义路由自带的排他性样式，通过linkActiveClass属性设置
   + 设置为mui-class,覆盖掉第一个router-link中的默认定义
   + 删除第一个router-link中的默认的class="mui-active",以避免出现选中两个路由按钮的情况
+ 主页轮播图的实现

# 这是一个项目

## 一个基础项目

### 值得学习

## 开源协议之间有何异同点？(https://zhuanlan.zhihu.com/p/78998314)

## 如果修改了代码，如何用传统方式(就是命令行的方式)上传到码云？
1. git add .
2. git commit -m "提交信息"
3. git push

## 项目完成进度
1.完成了header区域,使用的是mint-ui中的Header组件

2.完成了tab-bar,使用的是mui中的tabbar.html
 + 在制作购物车的小图标，特别是扩展图标的时候操作会多一些：
 + a.需要把icons-extra.css拷贝到mui文件夹css中；b.同时要把mui-icons-extra.ttf文件也拷贝到font文件夹下；c.
   将扩展图标的两个类样式添加到响应标签属性，同时原有基类样式也要保留(mui-icon)，否则图标和文字排列出现混乱，
   class="mui-icon mui-icon-extra mui-icon-extra-cart"
3.要在中间区域，放置一个router-view，展示路由匹配到的组件

## 改造tabbar中的a链接为 router-link

## 设置tabbar配置对象的linkActiveClass属性

## 设置tabbar对应的路由链接切换不同组件

## 制作首页轮播图布局

## 加载首页轮播数据
1.获取数据，如何获取呢？使用vue-resource
2.使用vue-resource的this.$http.get()获取数据
3.获取的数据要保存在data里，然后使用v-for循环渲染每个item项

## 改造九宫格区域的样式
1.和bootstrap类似默认每一行12份， mui-col-xs-4 mui-col-sm-3变成了mui-col-xs-6 mui-col-sm-4
2.默认的九宫格图标是字体图标，这里用的是本地图片

## 改造新闻资讯a标签为路由router-link,增加to属性，指定跳转路径，并在router.js配置匹配规则
1.绘制界面，使用页面的media-list.html中的内容
2.从vue-resource获取数据
3.渲染页面

## 实现点击新闻资讯的某一条信息 跳转至对应详情页面
+ 将资讯列表中的a,改造成路由router-link
+ 创建新闻详情的页面NewsInfo.vue
+ 在路由模块的配置对象中将路由和组件匹配起来

## 实现新闻详情页面的布局和数据渲染
+ 页面布局，相对简单，可以自己布局
+ 数据渲染，还是使用vue-resource

## 单独封装一个子组件，如何成为某组件的子组件呢？
+ 创建子组件comment.vue
+ 通过import comment from ……导入到要添加的组件中
+ 在要添加的组件中，使用components注册子组件comment
+ 把子组件名称以标签的形式，引入到html代码段中

## 获取数据渲染到评论页面中
## 更进一步需求，点击按钮【加载更多】，显示后面页面的数据
+ 为按钮【加载更多】绑定一个点击事件(设置:key属性会报错，是数据接口在开发的时候，没有设定唯一识别的id键，用add_time作为绑定的key属性，有重复的add_time,进而报错)
+ 让pageindex++,然后this调用一下getComment方法
+ 为了防止点击按钮时，新数据覆盖老数据，需要把加载更多，再次请求获得的数据result.body.message数组拼接到comments后面，使用this.comments=this.comments.concact(result.body.message)语句

## 在textarea中键入评论内容，点击【发表评论】按钮提交，然后最新发表的评论要显示在最上面
+ 为textarea做一个双向数据绑定
+ 为发表评论按钮添加一个点击事件
+ 通过vue-resource发表一个请求，把最新评论的内容提交到服务器
+ 当发表评论后，重新刷新列表，方便查看最新的评论---但是，如果还是像【加载更多】按钮的点击事件那样，复用getComments方法
会出现问题，比如点击过加载更多按钮，pageindex=n,将最新评论添加到首行后，会出现覆盖前面n-1页数据的问题。

## 换思路：因此，上述方法不可取，我们不妨换个思路，不请求数据，而只是在客户端手动拼接一个对象，然后把这个对象，用unshift方法添加到当前数组comments的开头

## 改造HomeContainer.vue文件中的【图片分享】a链接为router-link路由
## 制作顶部滑动栏
#### 制作顶部滑动条的坑
  a.需要借助于mui中tab-top-webview-main.html
  b.要将#slider中的类样式mui-fullscreen删掉，取消该滑动条的全屏样式
  c.这是一个js组件，仅复制一下滑动条的html代码块，是不能实现滑动条的滑动功能的，需要相关的js语法来初始化该组件
  1.导入mui.js 
  2.调用官方提供的初始化代码，代码如下：
  mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});
  3.在初始化mui.min.js过程中，导入mui.min.js文件时，会报错：bundle.js:48483 Uncaught TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode 
  解决方案:一.把mui.min.js文件中非严格模式的代码改掉，这不现实，这是别人封装好的；二.更改webpack对严格模式的禁用，让mui.min.js
  中的代码通过解析
  4.更改webpack工具严格模式的步骤：https://www.npmjs.com/package/babel-plugin-transform-remove-strict-mode ,
  安装babel-plugin-transform-remove-strict-mode包，并在.babelrc中配置
  5.在chrome浏览器中调试会出现问题：a.第一次打开页面是滑动不能用，需要刷新页面一下，滑动功能才能使用 b.tabbar切换出现失灵情况。
  + a问题解决办法是：把mui().scroll()那段初始化代码放在钩子函数mounted中。原因是要等到DOM中元素加载完毕，才能获取到类样式，所以
  需要把初始化代码放在mounted钩子函数中.
  + b问题的解决办法是：进入路由/home/photolist之后，需要手动刷新下页面，才能操作滑动条。解决办法：通过将【滑动条】的初始化代码放到组件生命周期的mounted钩子函数中。然而进入上面路由就可以滑动的问题解决了.tabbar的4个按钮，却出现了问题，点击没有反应了，组件无法切换了，mui-bar-tab .mui-tab-item 这个类样式修改名称，比如 .mui-tab-item1。就可以重新切换组件了，但是随之带来的问题是tabbar四大按钮的样式没有了，我们可以按照.mui-tab-item原来所有相关的样式自己封装
  6.获取所有分类并渲染分类列表

  ## 制作图片列表
  1.图片列表需要使用懒加载技术，我们可以Mint-UI提供的现成组件:`lazy-load`
  2.根据`lazy-load`的文档尝试使用
  3.渲染图片列表数据
  4.实现图片的懒加载 和图片样式梅花

  ## 实现了点击图片，跳转到图片的详情页
  1.在把li改造成router-link时，因为router-link默认是要解析成a标签的。改造后li相关的样式全部丢失，所以要在router-link标签内，设置tag属性，tag="li",此时router-link就解析成了li标签

  ## 实现详情页面的布局和美化，同时获取数据，渲染页面
  
  ## 实现图片详情中的 缩略图功能
  1.使用vue-preview这个缩略图插件
  2.获取到所有的图片列表，然后使用v-for指令渲染数据
  3.注意：img中原有的class属性不能去掉
  4.每个图片数据项必须有h和w属性，如接口中没有，自己拼接

  ## 绘制商品结构列表 并美化界面

  ## 尝试在手机上进行项目的测试和调试
  1.保证手机能够正常运行
  2.保证手机和电脑连接在同一个wifi环境，也就是手机可以访问电脑的ip地址
  3.打开自己的项目中package.json文件，在dev脚本中，添加一个--host指令值，把当前电脑的ip地址值，设置为--host的指令值
  + 如何查看自己电脑的ip。在电脑cmd窗口，运行命令 ipconfig，查看无线网的ip地址
  




  
  





  



