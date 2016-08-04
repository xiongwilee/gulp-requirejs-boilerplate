'use strict';

const fs = require('fs');
const path = require('path');

const minimist = require('minimist');
const glob = require('glob');
const through = require('through2');

/* 文件路径 */
let _path = exports.path = {
  app: './',
  app_absolute: path.resolve('../app/'),
  dist: './dist',
  dist_absolute: path.resolve('../server/app'),
  require: 'common/static/js/lib/require.js',
  requireConfig: 'static/js/require.config.js'
}

/* 获取命令行参数 */
let options = exports.options = getArgv();

// 获取基本路径
let appPath = exports.appPath = _path.app + options.mod + '/';
let distPath = exports.distPath = _path.dist + '/' + options.mod + '/';

/* 获取对应模块下的配置 */
let modOption = exports.modOption = getModoption();

/* 浏览器兼容配置 */
exports.autoPrefixBrowserList = ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'];

/* src路径 */
exports.src = Object.assign({}, {
  views: `${appPath}views/**/*.html`,
  js: `${appPath}static/js/**/*.js`,
  css: `${appPath}static/css/**/*`,
  image: `${appPath}static/image/**/*`,
  copy: [
    `${appPath}static/*`
  ],
  manifest: `${distPath}**/rev-manifest.json`
}, modOption.src);

/* 文件编译过滤器，把不需要编译的文件添加到这里 */
exports.filter = Object.assign({}, {
  css: ['!wallet/static/css/vux.css'],
  js: [],
  image: [],
  require: [],
  copy: []
}, modOption.filter);

/**
 * 给mainfest文件添加模块空间
 */
exports.gulpManifestAddMod = function(filetype) {
  return through.obj(function(file, enc, callback) {
    let fileContent = file.contents.toString('UTF-8');
    fileContent = fileContent.replace(/(\")([a-zA-Z0-9\-\_]{1,})/g, '$1/' + options.mod +'/static/'+ filetype + '/$2');
    file.contents = new Buffer(fileContent);
    callback(null, file);
  }, function(cb) {
    cb();
  })
}

/**
 * 获取模块的独立配置
 * @return {Object}
 */
function getModoption() {
  let modOptionPath = path.resolve(_path.app + options.mod + '/build/gulp.option.js');

  if (fs.existsSync(modOptionPath)) {
    return require(modOptionPath);
  }

  return {};
}

/**
 * 输出gulp stream 中文件信息
 * @return {Obejct}
 */
exports.readStream = function() {
  return through.obj((file, enc, callback) => {
    console.log('base:' + file.base, 'cwd:' + file.cwd, 'path:' + file.path, 'relative:' + file.relative);
    // console.log(file.contents.toString('UTF-8'))
    callback(null, file);
  }, (cb) => cb())
}

/**
 * 获取命令行参数
 * @return {Object} 参数对象
 */
function getArgv() {
  let options = minimist(process.argv.slice(2), {
    string: ['env', 'mod'],
    boolean: ['hash'],
    default: {
      env: process.env.ENV || 'development',
      mod: null,
      hash: true
    }
  });
  options.isDevelopment = (options.env == 'development');
  options.isProduction = (options.env == 'production');

  if (!options.mod) {
    throw ('请输入模块名，例如：gulp build --mod=bi...');
  }

  return options;
}
