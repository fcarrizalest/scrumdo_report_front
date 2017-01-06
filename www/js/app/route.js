define([
		'module',
		'backbone',
		'app/collections/iterationsCollection',
		'app/views/appshell/appshell',
		'app/views/appshell/iterationview',
		'app/collections/StoriesCollection'


	],
	function( module, Backbone  , iterations, AppshellView ,iterationview , stories){


		var AppRouter = Backbone.Router.extend({ 
			 routes:{
			 	'r1' : "r1",
			 	"view/:id":         "view",
			 	 "*actions": "defaultRoute" 
			 }
		});

	

	
	var initialize = function(){

		var app_router          =   new AppRouter;
		var $iterations_coleccion = new iterations(  );
		var $stories = new stories();

		$stories.url = module.config().basepath+'stories';
		$stories.fetch( {reset:true} );

		var $appshell = new AppshellView( app_router , $iterations_coleccion  );
		var $iterationview = new iterationview();
		
		$iterations_coleccion.url = module.config().basepath + "iterations/actual";
		$iterations_coleccion.fetch( {reset:true});	
		

		console.log("pp");
		console.log(module);

		if(navigator.serviceWorker != undefined ){

			if (navigator.serviceWorker.controller) {
				console.log("tengo ya un controller");
				var url = navigator.serviceWorker.controller.scriptURL;
				
				  
			}else {
				navigator.serviceWorker.register('service-worker.js', {
			    scope: '.'

			  	}).then(function(registration) {
				
				});
			}

		}else{
			console.log("Navegador sin SW");
		}



		

		app_router.on('route:defaultRoute', function(){ 

			console.log('aaa');
			$appshell.render();
			 
		}); 

		app_router.on('route:view', function(iteration_id){ 

			$iterationview.model = $iterations_coleccion.get( iteration_id );
			$iterationview.render();
			
		}); 

		app_router.on('route:r1', function(){ 

			
			 
		});



		Backbone.history.start();

		$appshell.render();
	};


	return {
        initialize: initialize
    };

});