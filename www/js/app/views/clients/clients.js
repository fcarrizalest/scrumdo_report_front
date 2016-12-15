define([
  
    'backbone',
   
    'mustache',
     'app/views/clients/client',
     'text!app/templates/clients/clients.html'

], function( Backbone , Mustache , clientView, template  ){ 

	var View = Backbone.View.extend({ 
		el:$(".demo-content"),
		initialize: function(app_router , conexion){ 
			

			this.app_router = app_router;
			
			this.conexion = conexion;
			
			console.log("inicial clientes");
			var c =  Backbone.Collection.extend({
				//url: 'https://push-3db45.firebaseio.com/entries.json?auth='+token,
				parse: function(response) {

					var array = $.map(response, function(value, index) {

						
				    return [value];
					
					});
    				
					
    				return array;
  				}				
			});
			this.iViews = [];
			this.collection = new c();
			_.bindAll(this, 'addOne', 'addAll');
			this.collection.bind('add', this.addOne , this.collection );
			this.collection.bind('reset', this.addAll ,this.collection );
			var self = this;
			if ('serviceWorker' in navigator) {


				navigator.serviceWorker.addEventListener('message', function(event) {

					console.log(event);
					if( event.data == "client-processed" ){

						
						
						setTimeout(function(){ self.collection.fetch({   merge:true });  }, 1000);
						setTimeout(function(){ self.collection.fetch({ reset:true, merge:true });  }, 2000);

					}
				})
			}

		},
		render: function(){ 

			

			

			var user = this.conexion.auth().currentUser;
			var token = user.Xc;

			this.collection.url= this.app_router.config.databaseURL+'/clients.json?auth='+token,

			

			//token = this.conexion.auth().createCustomToken(user.uid)
			//console.log(token);

			this.el = $(".demo-content");
			

			$(this.el).html(Mustache.to_html( template  ) );
			componentHandler.upgradeDom();
			componentHandler.upgradeAllRegistered();
			this.collection.fetch({ reset:true,  merge:true});
			var self = this;
			idbKeyval.keysByPre('outPostClient').then(function(keys){

				keys.forEach(function( postId,v ){ 

					idbKeyval.get(postId).then(function(client){ 

							client.sendding = "enviando...";
							
							console.log('enviando....');
							console.log(client);

							var model = self.collection.get( client.id ) ;
							console.log(model);

							if( model ){
								model.set('sendding','enviando');

							}else{
								self.collection.add(client , {merge:true });
							}
					});
				});
			});

			

			if(navigator.serviceWorker != undefined ){
				if (navigator.serviceWorker.controller) {

					navigator.serviceWorker.ready.then(function(swRegistration) {
						
	  					return swRegistration.sync.register('post_add_client' );
					});

				}
			}

			

		},
		
		addAll: function(){

			_.each(this.iViews,
                function(opView) {
                    //removemos la vista
                    opView.remove();
                }
            );
            this.iViews = [];
           
            try{
            this.collection.each(this.addOne);
        	}catch(ee){

        	}
		},
		addOne: function(item){

			console.log('addOne');
			console.log(item);
			var iView = new clientView({ model: item });

			this.iViews.push(iView);
			$('#client_list').append(iView.el);
		},

		events:{
			
		}


	});


	return View;

}); 