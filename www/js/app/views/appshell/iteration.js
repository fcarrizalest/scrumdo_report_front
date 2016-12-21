define([
    'backbone',
    'mustache',
    'text!app/templates/dashboard/dashboard.html',
    'app/views/appshell/iteration'
   

], function( Backbone , Mustache , template ,iteration_view ){ 

	var View = Backbone.View.extend({ 
		tagName:"li",
		initialize: function(){

            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'sync', this.render);
            this.render();

        },
		render: function() { 


			console.log(this.model.get('project'));
			$(this.el).html(   this.model.getTitle() + " | " +this.model.get('story_count') ) ;

		}
	});

	return View;
});