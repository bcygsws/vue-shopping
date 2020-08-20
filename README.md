# 学无止境-网课随心购项目

## 分为以下模块：

### 主页的设计

- 主页的头部栏 header（使用 mint-ui 组件）和切换栏 tabbar（使用 mui 组件）的样式设计
- tabbar 栏的功能切换
  - 在 router.js 中定义路由自带的排他性样式，通过 linkActiveClass 属性设置
  - 设置为 mui-class,覆盖掉第一个 router-link 中的默认定义
  - 删除第一个 router-link 中的默认的 class="mui-active",以避免出现选中两个路由按钮的情况
  - tabbar 中购物车按钮，使用了扩展字体，参考 mui 官方文档进行引入文件，设置样式。同时用 mui-icon-extra 替换所有和 mui-icon 相关的样式，原因是购物车这个按钮特殊，去掉了自带的 mui-icon 类样式，添加的是 mui-icon-extra
- 主页轮播图的实现
  - 注意轮播图的复用-需要单独抽离组件，复用的主要是其 view 层，因此，业务逻辑需要写在 home 层
  - 注意轮播图的宽度的在不同场合下的设置，首页轮播图（宽度 100%）、详情轮播图（宽度自适应，更美观）
- 六宫格实现

  - 通过 mui 库中的 grid-default.html 来中 html 片段来模拟，将九宫改成六宫格，同时去掉 mui-col-sm-3，保留 mui-col-es-4，使得每排为三个格子
  - bug 解决：当六宫格完成后，发现路由不能正常切换了。解决办法：将原 mui-tab-item 相关的样式保存起来，将 template 中的所有的 mui-tab-item 的样式替换为 mui-tab-item2。包括使用了扩展字体的【购物车】按钮中的 mui-tab-item 也同步替换成 mui-tab-item2

    - 【新闻资讯】--->列表展示页
    - 六宫格【新闻资讯】按钮。作用：展示新闻列表信息
    - template 使用 mui 中的 media-list.html 中的组件
    - 新闻列表项--->新闻详情页(自己布局)
    - 改造列表项路由，在 router.js 中添加路由匹配规则（带参数 id，指示哪一条列表信被点击了。通过在详情页中使用 this.\$route.params.id 中获取）
    - 新闻详情页=详情内容+评论模块（用户评论框【提交评论】+评论列表展示+【加载更多】）

    - 【图片分享】--->图片展示页
    - 六宫格【图片分享】按钮。作用：展示图片列表信息
    - 图片列表包括：顶部滑动条和图片列表
      - 顶部滑动条，使用 mui 的 tab-top-webview-main.html 中的组件。需要在 mounted 阶段完成初始化 mui('.mui-scroll-wrapper').scroll();
      - 图片列表中使用 vue-lazyload 包，实现懒加载技术，以减少 http 请求的次数，优化方面的考虑
    - 点击任何一张图片--->图片详情页
      - 图片详情页：包括详情内容、缩略图、评论列表（复用抽象出来的 Comment.vue 作为子组件，给子组件传一个分类 id）。难点：缩略图部分使用 vue-preview 包实现。a.vue-preview 包的引入、注册。b.请求缩略图数组数据后，需要对数组遍历(ForEach),同时对 width、heigth、src 属性进行处理，转化成 w、h、msrc,这样 vue-preview 渲染时才能识别。c.同时，缩略图样式表文件 style.css 导入到 main.js 文件中
    
    - 【商品购买】--->商品展示页
       - 六宫格【商品购买】按钮。作用：展示商品列表信息
       - 商品展示页：a.商品列表（flex布局，同时设置最小高度，保证每行的goodsitem盒子等高，且设置最小高度min-max,让每行高度按照内容自适应）；b.【加载更多】商品列表数组.concat(每次点击按钮获取的内容)
    - 商品展示页--->商品详情页
    


# 这是一个项目

## 一个基础项目

### 值得学习

## 开源协议之间有何异同点？(https://zhuanlan.zhihu.com/p/78998314)

## 如果修改了代码，如何用传统方式(就是命令行的方式)上传到码云？

1. git add .
2. git commit -m "提交信息"
3. git push

## 项目完成进度

1.完成了 header 区域,使用的是 mint-ui 中的 Header 组件

2.完成了 tab-bar,使用的是 mui 中的 tabbar.html

- 在制作购物车的小图标，特别是扩展图标的时候操作会多一些：
- a.需要把 icons-extra.css 拷贝到 mui 文件夹 css 中；b.同时要把 mui-icons-extra.ttf 文件也拷贝到 font 文件夹下；c.
  将扩展图标的两个类样式添加到响应标签属性，同时原有基类样式也要保留(mui-icon)，否则图标和文字排列出现混乱，
  class="mui-icon mui-icon-extra mui-icon-extra-cart" 3.要在中间区域，放置一个 router-view，展示路由匹配到的组件

## 改造 tabbar 中的 a 链接为 router-link

## 设置 tabbar 配置对象的 linkActiveClass 属性

## 设置 tabbar 对应的路由链接切换不同组件

## 制作首页轮播图布局

## 加载首页轮播数据

1.获取数据，如何获取呢？使用 vue-resource 2.使用 vue-resource 的 this.\$http.get()获取数据 3.获取的数据要保存在 data 里，然后使用 v-for 循环渲染每个 item 项

## 改造九宫格区域的样式

1.和 bootstrap 类似默认每一行 12 份， mui-col-xs-4 mui-col-sm-3 变成了 mui-col-xs-6 mui-col-sm-4 2.默认的九宫格图标是字体图标，这里用的是本地图片

## 改造新闻资讯 a 标签为路由 router-link,增加 to 属性，指定跳转路径，并在 router.js 配置匹配规则

1.绘制界面，使用页面的 media-list.html 中的内容 2.从 vue-resource 获取数据 3.渲染页面

## 实现点击新闻资讯的某一条信息 跳转至对应详情页面

- 将资讯列表中的 a,改造成路由 router-link
- 创建新闻详情的页面 NewsInfo.vue
- 在路由模块的配置对象中将路由和组件匹配起来

## 实现新闻详情页面的布局和数据渲染

- 页面布局，相对简单，可以自己布局
- 数据渲染，还是使用 vue-resource

## 单独封装一个子组件，如何成为某组件的子组件呢？

- 创建子组件 comment.vue
- 通过 import comment from ……导入到要添加的组件中
- 在要添加的组件中，使用 components 注册子组件 comment
- 把子组件名称以标签的形式，引入到 html 代码段中

## 获取数据渲染到评论页面中

## 更进一步需求，点击按钮【加载更多】，显示后面页面的数据

- 为按钮【加载更多】绑定一个点击事件(设置:key 属性会报错，是数据接口在开发的时候，没有设定唯一识别的 id 键，用 add_time 作为绑定的 key 属性，有重复的 add_time,进而报错)
- 让 pageindex++,然后 this 调用一下 getComment 方法
- 为了防止点击按钮时，新数据覆盖老数据，需要把加载更多，再次请求获得的数据 result.body.message 数组拼接到 comments 后面，使用 this.comments=this.comments.concact(result.body.message)语句

## 在 textarea 中键入评论内容，点击【发表评论】按钮提交，然后最新发表的评论要显示在最上面

- 为 textarea 做一个双向数据绑定
- 为发表评论按钮添加一个点击事件
- 通过 vue-resource 发表一个请求，把最新评论的内容提交到服务器
- 当发表评论后，重新刷新列表，方便查看最新的评论---但是，如果还是像【加载更多】按钮的点击事件那样，复用 getComments 方法
  会出现问题，比如点击过加载更多按钮，pageindex=n,将最新评论添加到首行后，会出现覆盖前面 n-1 页数据的问题。

## 换思路：因此，上述方法不可取，我们不妨换个思路，不请求数据，而只是在客户端手动拼接一个对象，然后把这个对象，用 unshift 方法添加到当前数组 comments 的开头

## 改造 HomeContainer.vue 文件中的【图片分享】a 链接为 router-link 路由

## 制作顶部滑动栏

#### 制作顶部滑动条的坑

a.需要借助于 mui 中 tab-top-webview-main.html
b.要将#slider 中的类样式 mui-fullscreen 删掉，取消该滑动条的全屏样式
c.这是一个 js 组件，仅复制一下滑动条的 html 代码块，是不能实现滑动条的滑动功能的，需要相关的 js 语法来初始化该组件 1.导入 mui.js 2.调用官方提供的初始化代码，代码如下：
mui('.mui-scroll-wrapper').scroll({
deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值 0.0006
}); 3.在初始化 mui.min.js 过程中，导入 mui.min.js 文件时，会报错：bundle.js:48483 Uncaught TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode
解决方案:一.把 mui.min.js 文件中非严格模式的代码改掉，这不现实，这是别人封装好的；二.更改 webpack 对严格模式的禁用，让 mui.min.js
中的代码通过解析 4.更改 webpack 工具严格模式的步骤：https://www.npmjs.com/package/babel-plugin-transform-remove-strict-mode ,
安装 babel-plugin-transform-remove-strict-mode 包，并在.babelrc 中配置 5.在 chrome 浏览器中调试会出现问题：a.第一次打开页面是滑动不能用，需要刷新页面一下，滑动功能才能使用 b.tabbar 切换出现失灵情况。

- a 问题解决办法是：把 mui().scroll()那段初始化代码放在钩子函数 mounted 中。原因是要等到 DOM 中元素加载完毕，才能获取到类样式，所以
  需要把初始化代码放在 mounted 钩子函数中.
- b 问题的解决办法是：进入路由/home/photolist 之后，需要手动刷新下页面，才能操作滑动条。解决办法：通过将【滑动条】的初始化代码放到组件生命周期的 mounted 钩子函数中。然而进入上面路由就可以滑动的问题解决了.tabbar 的 4 个按钮，却出现了问题，点击没有反应了，组件无法切换了，mui-bar-tab .mui-tab-item 这个类样式修改名称，比如 .mui-tab-item1。就可以重新切换组件了，但是随之带来的问题是 tabbar 四大按钮的样式没有了，我们可以按照.mui-tab-item 原来所有相关的样式自己封装 6.获取所有分类并渲染分类列表

## 制作图片列表

1.图片列表需要使用懒加载技术，我们可以 Mint-UI 提供的现成组件:`lazy-load` 2.根据`lazy-load`的文档尝试使用 3.渲染图片列表数据 4.实现图片的懒加载 和图片样式梅花

## 实现了点击图片，跳转到图片的详情页

1.在把 li 改造成 router-link 时，因为 router-link 默认是要解析成 a 标签的。改造后 li 相关的样式全部丢失，所以要在 router-link 标签内，设置 tag 属性，tag="li",此时 router-link 就解析成了 li 标签

## 实现详情页面的布局和美化，同时获取数据，渲染页面

## 实现图片详情中的 缩略图功能

1.使用 vue-preview 这个缩略图插件 2.获取到所有的图片列表，然后使用 v-for 指令渲染数据 3.注意：img 中原有的 class 属性不能去掉 4.每个图片数据项必须有 h 和 w 属性，如接口中没有，自己拼接

## 绘制商品结构列表 并美化界面

## 尝试在手机上进行项目的测试和调试

1.保证手机能够正常运行 2.保证手机和电脑连接在同一个 wifi 环境，也就是手机可以访问电脑的 ip 地址 3.打开自己的项目中 package.json 文件，在 dev 脚本中，添加一个--host 指令值，把当前电脑的 ip 地址值，设置为--host 的指令值

- 如何查看自己电脑的 ip。在电脑 cmd 窗口，运行命令 ipconfig，查看无线网的 ip 地址
