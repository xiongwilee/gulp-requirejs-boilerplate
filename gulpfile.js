'use strict';

const fs = require('fs');
const eventstream = require('event-stream');

const gulp = require('gulp');
const gulpSequence = require('gulp-sequence').use(gulp);

const cfg = global.cfg = require('./gulp/gulp.config');
const gulpClean = require('./gulp/gulp.clean');
const gulpJavascript = require('./gulp/gulp.javascript');
const gulpCss = require('./gulp/gulp.css');
const gulpHtml = require('./gulp/gulp.html');
const gulpImage = require('./gulp/gulp.image');
const gulpCopy = require('./gulp/gulp.copy');
const gulpDeploy = require('./gulp/gulp.deploy');

/* 清除dist目录 */
gulp.task('clean', () => gulpClean());

/* 编译JS文件 */
gulp.task('build:js', () => gulpJavascript());

/* 编译CSS文件 */
gulp.task('build:css', () => gulpCss());

/* 编译HTML文件 */
gulp.task('build:html', () => gulpHtml());

/* 编译图片 */
gulp.task('build:image', () => gulpImage());

/* 拷贝文件 */
gulp.task('build:copy', () => gulpCopy());

/**
 * build
 * @uses gulp build [option]
 *       gulp build  编译全部
 *       gulp build  --mod=doc  编译doc模块
 *       gulp build  --env=production  线上编译模式，包括压缩、合并等操作
 */
gulp.task('build', gulpSequence('clean','build:image', 'build:css', 'build:js', ['build:html', 'build:copy']));


/**
 * watch
 * @uses gulp watch [option]
 *       gulp watch  监听全部模块
 *       gulp watch  --mod=doc  监听doc模块
 *       gulp watch  --env=production  线上监听编译模式，包括压缩、合并等操作
 */
gulp.task('watch', ['build'], function() {
  gulp.watch([cfg.src.js], { cwd: cfg.path.cwd } ,['build:js']);
  gulp.watch([cfg.src.image], { cwd: cfg.path.cwd } ,['build:image']);
  gulp.watch([cfg.src.css], { cwd: cfg.path.cwd } ,['build:css']);
  gulp.watch([cfg.src.views], { cwd: cfg.path.cwd } ,['build:html']);
  gulp.watch(cfg.src.copy, { cwd: cfg.path.cwd } ,['build:copy'])
});