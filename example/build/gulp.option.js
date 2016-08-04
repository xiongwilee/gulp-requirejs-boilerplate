/**
 * 业务模块gulp独立配置文件
 */

// 需要操作的文件
exports.src = {
  copy: ['example/build/*']
}

// 不需要编译的文件
exports.filter = {
  js: [],
  css: ['!example/static/css/lib/reset.css']
}