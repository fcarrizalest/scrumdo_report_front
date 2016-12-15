define([
  
    'backbone',
    'mustache',
     'text!app/templates/clients/client.html'

], function( Backbone , Mustache , template  ){ 

	var View = Backbone.View.extend({ 
		
		initialize: function(app_router , conexion){ 
			

			this.app_router = app_router;
			
			this.conexion = conexion;
			
			console.log("inicial clientes");

			this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'sync', this.render);

			this.render();


		},
		render: function(){ 

			
			console.log('render client ');
			
			$(this.el).html(Mustache.to_html( template ,this.model.toJSON()  ) );
			$(this.el).addClass('mdl-list__item');
		},
		events:{
			
			
		}


	});


	return View;

}); 