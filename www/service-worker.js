importScripts('js/lib/sw-toolbox.js');




var CACHE_NAME = 'dependencies-cache';
var REQUIRED_FILES = [
  '/',
  'index.html'

  //'manifest.json'



];

toolbox.options.debug = true;
toolbox.options.cache.name = "scrum1";

toolbox.precache(REQUIRED_FILES);

toolbox.router.get('/', toolbox.fastest);
toolbox.router.get('/:index.html', toolbox.fastest);
toolbox.router.get('/js/lib/:file.js', toolbox.fastest);

toolbox.router.get('/(.*)', toolbox.fastest,{origin: 'https://a5429.herokuapp.com'});

toolbox.router.get('/(.*)', toolbox.cacheFirst,{origin: 'https://fonts.googleapis.com'});
toolbox.router.get('/(.*)', toolbox.cacheFirst,{origin: 'https://code.getmdl.io'});
toolbox.router.get('/(.*)', toolbox.cacheFirst,{origin: 'https://rawgit.com'});







