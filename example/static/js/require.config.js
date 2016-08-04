requirejs.config({
  baseUrl: '/',
  shim: {
    'jsonEdit': ['jquery'],
  },
  map: {
    '*': {
      'example:': 'example/static/js'
    }
  },
  paths: {
    'jquery': 'example/static/js/lib/jquery-2.1.3.min'
  }
});
