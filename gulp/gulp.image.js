'use strict';

const cfg = global.cfg;

const path = require('path');
const gulp = require('gulp');
const gulpif = require('gulp-if');
const rev = require('gulp-rev');
const plumber = require('gulp-plumber');
const filter = require('gulp-filter');
const imagemin = require('gulp-imagemin');

/**
 * 编译html
 * @return
 */
function gulpImage() {
  let manifestPath = cfg.distPath + 'static/image/';
  let imageFilter = filter(['**/*.jpg', '**/*.jpeg', '**/*.png', '**/*.gif'].concat(cfg.filter.image), { restore: true });

  return gulp.src(cfg.src.image, { cwd: path.resolve(cfg.path.app), base: '.' })
    // .pipe(imageFilter)
    // .pipe(gulpif(cfg.options.isProduction,imagemin()))
    // .pipe(imageFilter.restore)
    .pipe(gulp.dest(cfg.path.dist))
    .pipe(rev())
    .pipe(gulp.dest(cfg.path.dist))
    .pipe(rev.manifest())
    // .pipe(cfg.gulpManifestAddMod('image'))
    .pipe(gulp.dest(manifestPath));
}

module.exports = gulpImage;
