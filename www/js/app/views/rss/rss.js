define([
  
    'backbone',
    'mustache',
     'app/views/rss/card',

], function( Backbone , Mustache , CardView  ){ 

	var View = Backbone.View.extend({ 
		//el:$("#app"),
		initialize: function(app_router , conexion){ 
			
			this.app_router = app_router;
			this.conexion = conexion;

			var c =  Backbone.Collection.extend({
				//url: 'https://push-3db45.firebaseio.com/entries.json?auth='+token,
				parse: function(response) {

					

					var array = $.map(response, function(value, index) {
				    return [value];
					});
    				
					
    				return array;
  				}				
			});

			this.collection = new c();

			this.collection.bind('add', this.addOne , this.collection );

			
		},
		render: function(){ 

	
			this.collection.fetch();



		},
		addAll: function(){

			_.each(this.iViews,
                function(opView) {
                    //removemos la vista
                    opView.remove();
                }
            );
            this.iViews = [];
           

            this.collection.each(this.addOne);

		},
		addOne: function(item){

			
			var iView = new CardView({ model: item });

			


			$('.demo-content').append(iView.el);
		}
			


		});


	return View;

}); 