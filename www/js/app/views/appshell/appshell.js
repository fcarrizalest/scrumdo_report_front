define([
  
    'backbone',
    'mustache',
     'text!app/templates/dashboard/dashboard.html',
   

], function( Backbone , Mustache , template  ){ 

	var View = Backbone.View.extend({ 
		el:$("#app"),
		initialize: function(app_router){ 
			

			this.app_router = app_router;
			
			
			

		},
		render: function(){ 

			

			
			$(this.el).html(Mustache.to_html( template  ) );
			
			

			

		},
		


	});


	return View;

}); 