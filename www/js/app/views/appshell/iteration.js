define([
    'backbone',
    'mustache',
     'text!app/templates/dashboard/iteration.html',
    'app/views/appshell/iteration'
   
   

], function( Backbone , Mustache , template ,iteration_view  ){ 

	var View = Backbone.View.extend({ 
		tagName:"li",
		initialize: function(){

            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'sync', this.render);
            
            $(this.el).addClass("mdl-list__item mdl-list__item--two-line");
            this.render();

        },
		render: function() { 


			console.log(this.model.get('project'));
			//$(this.el).html(   this.model.getTitle() + " | " +this.model.get('story_count') + " | " + this.model.get('suma_puntos') ) ;

			$(this.el).html(Mustache.to_html( template , this.model.toJSON()   ) );

		}
	});

	return View;
});