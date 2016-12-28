define([
		'module',
		'backbone',
		'app/collections/iterationsCollection',
		'app/views/appshell/appshell',
		'app/views/appshell/iterationview'

	],
	function( module, Backbone  , iterations, AppshellView ,iterationview ){


		var AppRouter = Backbone.Router.extend({ 
			 routes:{ 
			 	"view/:id":         "view",
			 	 "*actions": "defaultRoute" 
			 }
		});

	

	
	var initialize = function(){

		var app_router          =   new AppRouter;
		var $iterations_coleccion = new iterations(  );

		var $appshell = new AppshellView( app_router , $iterations_coleccion  );
		var $iterationview = new iterationview();

		var dayOfWeek = 3;//friday
		var date = new Date( );
		date.setDate(date.getDate() + (dayOfWeek + 7 - date.getDay()) % 7);

		$iterations_coleccion.url = module.config().basepath + "iterations/"+date.getFullYear() + "-"+( date.getMonth()+1 )+"-" + date.getDate();
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

			
			 
		}); 

		app_router.on('route:view', function(iteration_id){ 


			$iterationview.model = $iterations_coleccion.get( iteration_id );
			$iterationview.render();
			
			 
		}); 



		Backbone.history.start();

		$appshell.render();
	};


	return {
        initialize: initialize
    };

});