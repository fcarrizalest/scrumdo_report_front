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


			
			$(this.el).html(Mustache.to_html( template , this.model.toJSON()   ) );

		},
		 events: {
    		"click" : "detalle",
  		},
  		detalle:function(){

  			
  			this.app_router.navigate("view/"+this.model.get('id'), {trigger: true, replace: true});


  		}
	});

	return View;
});