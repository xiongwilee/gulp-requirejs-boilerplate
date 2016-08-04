# gulp-requirejs-boilerplate

基于gulp+requirejs+less的多应用构建方案

## 一、Getting Started

### 适用场景

适用于中小型业务团队中，多项Web应用产品线的前端的资源构建部署。

例如：某电商公司下，包括主站、商家后台、广告后台、招商平台等各类产品线，gulp-requirejs-boilerplate就可以用一条命令实现对static/views等资源进行模块化打包。

### 特性
* 基于gulp+requirejs+less的多应用构建支持
* JavaScript/CSS资源合并压缩
* 支持HTML中静态资源MD5戳自动替换
* HTML中静态资源combo模式合并


### 示例

![gulp-requirejs-boilerplate.gif](https://raw.githubusercontent.com/xiongwilee/demo/master/photo/gulp-requirejs-boilerplate.gif)

下载gulp代码及编译工具

```
$ git clone https://github.com/xiongwilee/gulp-requirejs-boilerplate.git my-apps
```

进入示例目录并安装（推荐使用[cnpm](https://cnpmjs.org/)安装）
```
$ cd my-apps && npm install
```

编译代码：用生产环境模式编译所有静态资源
```
$ gulp build --env=production --mod=example
```

查看示例，可以使用[static-server](https://www.npmjs.com/package/static-server)之类的工具
```
$ cd dist && static-server
```
然后用浏览器访问： [http://localhost:9080/example/views/index.html](http://localhost:9080/example/views/index.html)

## 二、使用方法

### 任务说明

```
Usage: gulp [task] --env=[producition|development] --mod=[应用名]

Example: gulp build --env=production --mod=example

Tasks: 
    watch                               监听模式启动build任务
    build                               整体编译
    build:clean                         清空产出目录

    build:js                            仅仅编译js文件
    build:css                           仅仅编译css文件
    build:image                         仅仅编译image文件
    build:html                          仅仅编译html文件
    build:copy                          拷贝资源到dist目录

Options:
    --env                               当前的环境变量，可选：production|development,默认:development
    --mod                               当前要编译的应用名称，必填
```

### 配置说明

**全局path配置**

详细配置模块请参看：`gulp/gulp.config.js`

```
exports.path = {
  app: './',                                    // 应用业务代码路径
  dist: './dist',                               // 产出文件路径
  requireConfig: 'static/js/require.config.js'  // reqirejs配置文件路径
}
```

**应用独立配置**

另外你可以在你的业务模块的`build/gulp.options.js`中自行配置独立的`src`,`filter`配置，请参考：`example/build/gulp.options.js`
```
/**
 * 业务模块gulp独立配置文件
 */

// 需要操作的文件
exports.src = {
  copy: ['example/build/*']
}

// 不需要编译的文件
exports.filter = {
  js: [],
  css: ['!example/static/css/lib/reset.css']
}
```


## 三、TODO
* CSS保存时报错忽略
* 开发环境模式下也产出了时间戳文件
* 自动图片精灵处理


