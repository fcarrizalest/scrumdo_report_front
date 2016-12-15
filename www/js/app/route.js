define(['backbone', 
		'app/views/appshell/appshell'

	],
	function( Backbone  , AppshellView  ){


		var AppRouter = Backbone.Router.extend({ 
			 routes:{ 
			 	 "*actions": "defaultRoute" 
			 }
		});

	

	
	var initialize = function(){

		var app_router          =   new AppRouter;
		var $appshell = new AppshellView( app_router, conexion );
		

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

			$appshell.render();
			 
		}); 



		Backbone.history.start();


	};


	return {
        initialize: initialize
    };

});