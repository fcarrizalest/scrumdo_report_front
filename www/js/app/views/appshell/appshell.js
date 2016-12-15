define([
  
    'backbone',
    'mustache',
     'text!app/templates/dashboard/dashboard.html',
     'app/views/rss/rss',

], function( Backbone , Mustache , template ,rssView ){ 

	var View = Backbone.View.extend({ 
		el:$("#app"),
		initialize: function(app_router , conexion){ 
			

			this.app_router = app_router;
			
			this.conexion = conexion;
			
			this.rss = new rssView(app_router, conexion);

		},
		render: function(){ 

			$(this.el).addClass('mdl-layout--fixed-drawer');

			var user = this.conexion.auth().currentUser;
			var token = user.Xc;

			//token = this.conexion.auth().createCustomToken(user.uid)
			//console.log(token);

			$(this.el).html(Mustache.to_html( template, {email:user.email , permisos: this.app_router.permisos }  ) );
			componentHandler.upgradeDom();
			componentHandler.upgradeAllRegistered();
			
			// this.rss.collection.url= 'https://push-3db45.firebaseio.com/entries.json?auth='+token,
			// this.rss.el = $('.demo-content');
			// this.rss.render();

			//hack
			var e = $('.mdl-js-layout')[0];
			var n = new MaterialLayout( e );

			

			

		},
		events:{
			"click #logout" : "do_logout",
		},
		do_logout:function(){

			console.log("aaaa");
			this.conexion.auth().signOut().then(function(e) {
				console.log(e);
			  // Sign-out successful.
			}, function(error) {
			  // An error happened.
			  console.log(error);
			});


		}


	});


	return View;

}); 