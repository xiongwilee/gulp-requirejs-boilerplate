'use strict';

const cfg = global.cfg;

const path = require('path');
const gulp = require('gulp');
const gulpif = require('gulp-if');
const rev = require('gulp-rev');
const revCollector = require('gulp-rev-collector');
const less = require('gulp-less');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const filter = require('gulp-filter');

/**
 * 编译css
 * @return
 */
function gulpCss() {
  let distPath = cfg.distPath + 'static/css';
  let maniImagePath = cfg.distPath + 'static/image/' + cfg.src.manifest;
  let cssFilter = filter(['**/*.less', '**/*.css'].concat(cfg.filter.css), { restore: true });
  // 避免冗余的文件被拷贝到ouput目录，如maniImagePath
  // 因为为了替换CSS中的imagew文件，在src中添加了maniImagePath，所以在这里把图片文件排除
  let copyFilter = filter(['**/*', '!' + maniImagePath]);

  if (cfg.options.isProduction) {
    // 配置当前路径为文件app路径， 参考：https://github.com/gulpjs/vinyl#optionscwd
    return gulp.src(cfg.src.css, { cwd: cfg.path.cwd , base: cfg.path.base })
      .pipe(cssFilter)
      .pipe(revCollector())
      .pipe(less())
      .pipe(autoprefixer({ browsers: cfg.autoPrefixBrowserList }))
      .pipe(cleanCSS())
      .pipe(cssFilter.restore)
      // 其他文件直接被拷贝过去即可
      .pipe(copyFilter)
      .pipe(gulp.dest(cfg.path.dist))
      .pipe(rev())
      .pipe(gulp.dest(cfg.path.dist))
      .pipe(rev.manifest())
      .pipe(gulp.dest(distPath));
  }else{
    // 配置当前路径为文件app路径， 参考：https://github.com/gulpjs/vinyl#optionscwd
    return gulp.src(cfg.src.css, { cwd: cfg.path.cwd , base: cfg.path.base })
      .pipe(plumber())
      .pipe(cssFilter)
      .pipe(less())
      .pipe(cssFilter.restore)
      // 其他文件直接被拷贝过去即可
      .pipe(copyFilter)
      .pipe(gulp.dest(cfg.path.dist));

  }
}

module.exports = gulpCss;
