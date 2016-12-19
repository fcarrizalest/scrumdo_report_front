define([
		'module',
		'backbone',
		'app/collections/iterationsCollection',
		'app/views/appshell/appshell'

	],
	function( module, Backbone  , iterations, AppshellView  ){


		var AppRouter = Backbone.Router.extend({ 
			 routes:{ 
			 	 "*actions": "defaultRoute" 
			 }
		});

	

	
	var initialize = function(){

		var app_router          =   new AppRouter;
		var $appshell = new AppshellView( app_router );
		var $iterations_coleccion = new iterations(  );

		$iterations_coleccion.url = module.config().basepath + "iterations";
		$iterations_coleccion.fetch();	
		
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

			
			 
		}); 



		Backbone.history.start();

		$appshell.render();
	};


	return {
        initialize: initialize
    };

});