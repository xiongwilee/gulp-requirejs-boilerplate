'use strict';

const cfg = global.cfg;

const path = require('path');
const gulp = require('gulp');
const gulpif = require('gulp-if');
const plumber = require('gulp-plumber');
const gunzip = require('gulp-gunzip');
const untar = require('gulp-untar');
const through = require('through2');

/**
 * 解压部署文件
 * @return
 */
function gulpDeploy() {
  let tarPath = cfg.appPath + 'output.tar.gz';
  let distPath = cfg.path.dist;

  return gulp.src(tarPath)
    .pipe(gunzip())
    .pipe(untar())
    .pipe(gulp.dest(distPath));
}

module.exports = gulpDeploy;
