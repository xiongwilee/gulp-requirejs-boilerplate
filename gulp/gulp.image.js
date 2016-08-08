'use strict';

const cfg = global.cfg;

const path = require('path');
const gulp = require('gulp');
const gulpif = require('gulp-if');
const rev = require('gulp-rev');
const plumber = require('gulp-plumber');
const filter = require('gulp-filter');
// const imagemin = require('gulp-imagemin');

/**
 * 编译html
 * @return
 */
function gulpImage() {
  let manifestPath = cfg.distPath + 'static/image/';
  let imageFilter = filter(['**/*.jpg', '**/*.jpeg', '**/*.png', '**/*.gif'].concat(cfg.filter.image), { restore: true });

  if (cfg.options.isProduction) {
    return gulp.src(cfg.src.image, { cwd: cfg.path.cwd , base: cfg.path.base })
      // .pipe(imageFilter)
      // .pipe(gulpif(cfg.options.isProduction,imagemin()))
      // .pipe(imageFilter.restore)
      .pipe(gulp.dest(cfg.path.dist))
      .pipe(rev())
      .pipe(gulp.dest(cfg.path.dist))
      .pipe(rev.manifest())
      .pipe(gulp.dest(manifestPath));
  }else{
    return gulp.src(cfg.src.image, { cwd: cfg.path.cwd , base: cfg.path.base })
      .pipe(gulp.dest(cfg.path.dist))
  }
}

module.exports = gulpImage;
