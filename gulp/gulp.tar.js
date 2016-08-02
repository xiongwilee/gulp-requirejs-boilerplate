'use strict';

const cfg = global.cfg;

const path = require('path');
const gulp = require('gulp');
const gulpif = require('gulp-if');
const plumber = require('gulp-plumber');
const tar = require('gulp-tar');
const gzip = require('gulp-gzip');

/**
 * 打包产出文件成tar.gz文件
 * @return
 */
function gulpTar() {
  let buildPath = cfg.distPath;
  let distPath = cfg.appPath;

  return gulp.src(buildPath + '**/*')
    .pipe(plumber())
    .pipe(tar('output.tar'))
    .pipe(gzip())
    .pipe(gulp.dest(distPath));
}

module.exports = gulpTar;
