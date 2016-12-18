define([
    'backbone',
    'mustache',
     'text!app/templates/dashboard/dashboard.html',
   

], function( Backbone , Mustache , template  ){ 

	var View = Backbone.View.extend({ 
		el:$(".page-content"),
		initialize: function(app_router){ 
			
			this.app_router = app_router;
		},
		render: function(){ 

			$(this.el).html(Mustache.to_html( template  ) );

			var dayOfWeek = 3;//friday
			var date = new Date( );
			date.setDate(date.getDate() + (dayOfWeek + 7 - date.getDay()) % 7);
			
			
		},
		


	});


	return View;

}); 