define([
  
    'backbone',
    'mustache',
    'jquery.validate',
     'text!app/templates/register/register.html'

], function( Backbone , Mustache , v,template  ){ 

	var View = Backbone.View.extend({ 
		el:$("#app"),
		initialize: function(app_router , conexion){ 
			

			this.app_router = app_router;
			
			this.conexion = conexion;
			

		},
		render: function(){

			

			$(this.el).removeClass('mdl-layout--fixed-drawer');
			$(this.el).html(Mustache.to_html( template ) );
			componentHandler.upgradeDom();

			this.form = $( "#frm_register" );
			//this.form.validate();
			console.log(this.conexion);

		},
		events:{
			"click #btn_register" : "do_register",
			"submit #loginForm" : "do_register"
		},
		do_register: function(){

			var email = $('#email').val();
			var password = $('#password').val();
			var self = this;
			if(this.form.valid() ){


				self.conexion.auth().createUserWithEmailAndPassword(email, password).then( function(user) {

				

				 


				}).catch( function(error) {
				  // Handle Errors here.
				  var errorCode = error.code;
				  var errorMessage = error.message;

				});



				
			}

		}

	});


	return View;

}); 