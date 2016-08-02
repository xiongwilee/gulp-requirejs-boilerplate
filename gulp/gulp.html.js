'use strict';

const cfg = global.cfg;

const path = require('path');
const gulp = require('gulp');
const gulpif = require('gulp-if');
const rev = require('gulp-rev');
const revCollector = require('gulp-rev-collector');
const useref = require('gulp-useref');
const plumber = require('gulp-plumber');
const filter = require('gulp-filter');

/**
 * 编译html，包括：
 *   1. 合并文件
 *   2. 添加静态文件时间戳
 * @return
 */
function gulpHtml() {
  let distPath = cfg.distPath + 'views';
  let manifestPath = cfg.path.dist + '/*/static/*/' + cfg.src.manifest,
    htmlPath = cfg.appPath + cfg.src.views;

  let jsFilter = filter(['**/*.js'], { restore: true });
  let jsManifestPath = cfg.distPath + 'static/js/rev-manifest.json';
  let htmlFilter = filter(['**/*.html'], { restore: true });

  let curTask;
  if (cfg.options.isProduction) {
    return gulp.src([manifestPath, htmlPath], { cwd: path.resolve(cfg.path.app)})
      .pipe(htmlFilter)
      .pipe(useref({
        base: '.',
        searchPath: cfg.path.dist
      }))
      .pipe(jsFilter)
      .pipe(gulp.dest(cfg.path.dist))
      .pipe(rev())
      .pipe(gulp.dest(cfg.path.dist))
      .pipe(rev.manifest(jsManifestPath, { merge: true }))
      .pipe(gulp.dest('.'))
      .pipe(jsFilter.restore)
      .pipe(htmlFilter.restore)
      .pipe(revCollector())
      .pipe(gulp.dest(distPath));
  } else {
    return gulp.src(htmlPath, { cwd: path.resolve(cfg.path.app)})
      .pipe(gulp.dest(distPath));
  }
}

module.exports = gulpHtml;
