importScripts('js/lib/sw-toolbox.js');




var CACHE_NAME = 'dependencies-cache';
var REQUIRED_FILES = [
  '/',
  'index.html',
  '/css/main.css',
  '/js/common.js',
  '/js/lib/require.js'
  //'manifest.json'



];

toolbox.options.debug = false;
toolbox.options.cache.name = "scrum1";

toolbox.precache(REQUIRED_FILES);

toolbox.router.get('/', toolbox.fastest);
toolbox.router.get('/:index.html', toolbox.fastest);
toolbox.router.get('/js/lib/:file.js', toolbox.fastest);
toolbox.router.get('/js/:lib.js', toolbox.fastest);
toolbox.router.get('/css/main.css', toolbox.fastest);

toolbox.router.get('/(.*)', toolbox.fastest,{origin: 'https://a5429.herokuapp.com'});

toolbox.router.get('/(.*)', toolbox.cacheFirst,{origin: 'https://fonts.googleapis.com'});
toolbox.router.get('/(.*)', toolbox.cacheFirst,{origin: 'https://code.getmdl.io'});
toolbox.router.get('/(.*)', toolbox.cacheFirst,{origin: 'https://rawgit.com'});







