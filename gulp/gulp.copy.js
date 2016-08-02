'use strict'

const cfg = global.cfg;

const path = require('path');
const gulp = require('gulp');

module.exports = function() {
  return gulp.src(cfg.src.copy, { cwd: path.resolve(cfg.path.app), base: './' + cfg.options.mod })
    .pipe(gulp.dest(cfg.distPath));
}
