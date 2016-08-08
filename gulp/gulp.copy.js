'use strict'

const cfg = global.cfg;

const path = require('path');
const gulp = require('gulp');

module.exports = function() {
  return gulp.src(cfg.src.copy, { cwd: cfg.path.cwd , base: cfg.path.base })
    .pipe(gulp.dest(cfg.path.dist));
}
