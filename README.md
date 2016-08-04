# gulp-requirejs-boilerplate

基于gulp+requirejs+less的多应用构建方案

## 一、入门

### 适用场景

适用于中小型业务团队中，多项Web应用产品线的前端的资源构建部署。

例如：某电商公司下，包括主站、商家后台、广告后台、招商平台等各类产品线，gulp-requirejs-boilerplate就可以用一条命令实现对static/views等资源进行模块化打包。

### 特性
* 基于gulp+requirejs+less的多应用构建支持
* JavaScript/CSS资源合并压缩
* 支持HTML中静态资源MD5戳自动替换
* 支持tar.gz格式压缩打包/解压缩


### Getting Started
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
然后用浏览器访问： http://localhost:9080/example/views/index.html 

## 二、使用方法

****

**监听模式**

**tar.gz格式打包**

**清空目录**

### 配置说明

**path**

**src**

**filter**



## 五、TODO
* CSS保存时报错忽略
* 开发环境模式下也产出了时间戳文件
* 自动图片精灵处理


