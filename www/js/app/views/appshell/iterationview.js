define([
    'backbone',
    'mustache'
   
   
   

], function( Backbone , Mustache    ){ 

	var View = Backbone.View.extend({ 

		initialize: function(){

            // this.listenTo(this.model, 'change', this.render);
            // this.listenTo(this.model, 'sync', this.render);
            
            
            

        },
		render: function() { 

			console.log('render');

			//$(this.el).html(   this.model.getTitle() + " | " +this.model.get('story_count') + " | " + this.model.get('suma_puntos') ) ;

			//$(this.el).html(Mustache.to_html( template , this.model.toJSON()   ) );

		}
		});

	return View;
});