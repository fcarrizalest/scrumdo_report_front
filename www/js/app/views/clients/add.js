define([
  
    'backbone',
    'mustache',
     'text!app/templates/clients/add.html'

], function( Backbone , Mustache , template  ){ 

	var View = Backbone.View.extend({ 
		el:$(".demo-content"),
		initialize: function(app_router , conexion){ 
			

			this.app_router = app_router;
			
			this.conexion = conexion;
			
			console.log("inicial clientes");

			

		},
		render: function(){ 

			
			console.log($(this.el))
			var user = this.conexion.auth().currentUser;
			var token = user.Xc;

			//token = this.conexion.auth().createCustomToken(user.uid)
			//console.log(token);

			this.setElement(  $(".demo-content") );
			

			$(this.el).html(Mustache.to_html( template  ) );
			componentHandler.upgradeDom();
			componentHandler.upgradeAllRegistered();
			
			console.log("render cli")
		},
		events:{
			"click #btn_do_add" : "do_add",
			
		},
		do_add : function(){
			var name = $('#name').val();
			var last_name = $('#last_name').val();
			var tel = $('#tel').val();
			var self = this;
			var d = new Date();
			var n = d.getTime();
			
			dataPost = {
			    name: name,
			    last_name: last_name,
			    tel : tel,
			    id: n
			  };

			if(navigator.serviceWorker != undefined ){
				if (navigator.serviceWorker.controller) {
					console.log("tengo ya un controller");

					var url = navigator.serviceWorker.controller.scriptURL;

					
					dataPost.postId = 'outPostClient_' + n ;
					
					idbKeyval.set( dataPost.postId   ,  dataPost );
					
					navigator.serviceWorker.ready.then(function(swRegistration) {
						
	  					return swRegistration.sync.register('post_add_client' );
					});
					self.app_router.navigate("clients" , {trigger: true});
				}
				  
			}else{


			this.conexion.database().ref().child('clients').push(dataPost).then(function(e){

			  	self.app_router.navigate("clients" , {trigger: true});

			  }).catch(function(error){

			  	console.log("Error");
			  	console.log(error);
			  	self.app_router.navigate("clients" , {trigger: true});

			  });

			}
		} 


	});


	return View;

}); 