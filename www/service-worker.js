importScripts('js/lib/sw-toolbox.js');




var CACHE_NAME = 'dependencies-cache';
var REQUIRED_FILES = [
  '/',
  'index.html'

  //'manifest.json'



];

toolbox.options.debug = false;
toolbox.options.cache.name = "scrum";

toolbox.precache(REQUIRED_FILES);

toolbox.router.get('/', toolbox.cacheFirst);
toolbox.router.get('/:index.html', toolbox.cacheFirst);
toolbox.router.get('/js/lib/:file.js', toolbox.cacheFirst);

toolbox.router.get('/(.*)', toolbox.cacheFirst,{origin: 'https://a5429.herokuapp.com'});

toolbox.router.get('/(.*)', toolbox.cacheFirst,{origin: 'https://fonts.googleapis.com'});
toolbox.router.get('/(.*)', toolbox.cacheFirst,{origin: 'https://code.getmdl.io'});
toolbox.router.get('/(.*)', toolbox.cacheFirst,{origin: 'https://rawgit.com'});







