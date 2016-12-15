define([
  
    'backbone',
    'mustache',
     'text!app/templates/rss/card.html',

], function( Backbone , Mustache , template   ){ 

	var View = Backbone.View.extend({ 
		
		initialize: function(app_router , conexion){ 
			
			this.app_router = app_router;
			this.conexion = conexion;
			
			this.render();

			
		},
		render: function(){ 

			$(this.el).html(Mustache.to_html( template , this.model.toJSON()));

			$(this.el).addClass('mdl-cell mdl-cell--4-col')
		},
		

		});


	return View;

}); 