define([
  
    'backbone',
    'mustache',
     'text!app/templates/login/login.html',
      'jquery.validate',

], function( Backbone , Mustache , template ,v ){ 

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
			componentHandler.upgradeAllRegistered();
			//this.form = $( "#loginForm" );
			

		},
		events:{
			"click #btn_login" : "do_login",
			"submit #loginForm" : "do_login"
		},
		do_login: function(){

			var email = $('#email').val();
			var password = $('#password').val();
			var self = this;
			//this.form.validate();
			//if(this.form.valid() ){


				this.conexion.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
				  // Handle Errors here.
				  var errorCode = error.code;
				  var errorMessage = error.message;
				  var snackbarContainer = document.querySelector('#demo-snackbar-example');
				  var data = {
				      message: errorMessage ,
				      timeout: 2000,
				    //  actionHandler: handler,
				   //   actionText: 'Undo'
				    };
				    snackbarContainer.MaterialSnackbar.showSnackbar(data);
				  // ...
				});


				
			//}

		}


	});


	return View;

}); 