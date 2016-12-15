importScripts('js/lib/sw-toolbox.js');
importScripts('js/lib/idb.js','js/lib/idbKeyval.js');




var CACHE_NAME = 'dependencies-cache';
var REQUIRED_FILES = [
  '/',
  'index.html',

  //'manifest.json'



];

toolbox.options.debug = false;
toolbox.options.cache.name = "scrum";

toolbox.precache(REQUIRED_FILES);

toolbox.router.get('/', toolbox.cacheFirst);
toolbox.router.get('/:index.html', toolbox.cacheFirst);
toolbox.router.get('/js/lib/:file.js', toolbox.cacheFirst);






function do_add_client(){

      


      idbKeyval.get('userData').then(function(val){
        // tengo datos del usuario
        var token = val.token;
        console.log('then vals ');

         idbKeyval.keysByPre('outPostClient').then(function(keys){
          console.log('then keys ');



               keys.forEach(function( postId,v ){
                console.log('then each ');


                   idbKeyval.get(postId).then(function(client){
                    console.log('then client ');

                    var keyToDelete = client.postId;

                     fetch('https://push-3db45.firebaseio.com/clients.json?auth='+token, {
                        method: 'POST',
                        body: JSON.stringify(client),
                        headers: { 'Content-Type': 'application/json' }
                    }).then(function() {
                        // Success! Remove them from the outbox
                        console.log('then fetch ');
                        idbKeyval.delete(keyToDelete).then(function(){

                            clients.matchAll({ includeUncontrolled: true }).then(function(clientsA){

                              console.log(clientsA);
                              clientsA.forEach( function(client ){ client.postMessage('client-processed') } )
                            })

                        });

                    
                    });


                });

                  console.log('then end each ');

              });
              console.log('then end keys ');

              

        })
         console.log('then end vals ');


      }).then(function(){

          console.log("despuest de todo ???")

      })
      .catch(function(err){

        console.log("No tengo datos del usuario no hago nada ");

      });

}
