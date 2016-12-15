define([
  //'router' // Request router.js
  'app/route'

], function(Router ){

  var initialize = function(){
    // Pass in our Router module and call it's initialize function
    	Router.initialize();
    	console.log('Inicia');
  };

  return { 
    initialize: initialize
  };
});