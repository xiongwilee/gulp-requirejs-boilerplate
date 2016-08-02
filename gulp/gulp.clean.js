'use strict';

const cfg = global.cfg;

const path = require('path');
const gulp = require('gulp');
const shell = require('gulp-shell');
const gulpif = require('gulp-if');
const plumber = require('gulp-plumber');

/**
 * 清除dist目录
 * @return
 */
function gulpClean() {
  return gulp.src(cfg.distPath)
    .pipe(shell(['rm -rf ' + cfg.distPath]))
}

module.exports = gulpClean;
