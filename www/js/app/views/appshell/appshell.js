define([
    'backbone',
    'mustache',
    'text!app/templates/dashboard/dashboard.html',
    'app/views/appshell/iteration'
   

], function( Backbone , Mustache , template ,iteration_view ){ 

	var View = Backbone.View.extend({ 
		el:$(".page-content"),
		initialize: function(app_router,$iterations_coleccion){ 
			
			this.app_router = app_router;
			this.collection = $iterations_coleccion;
			 _.bindAll(this, 'addOne', 'addAll');
            this.collection.bind('reset', this.addAll ,this.collection );
            this.collection.bind('remove', this.addAll , this.collection );
            this.collection.bind('add', this.addAll , this.collection );
            //this.collection.bind('sort', this.addAll , this.collection );
            this.collection.bind('change', this.addAll , this.collection );
		},
		render: function(){ 



			$(this.el).html(Mustache.to_html( template  ) );
			
			
		},
		 addAll: function(){
           
           console.log(2);
        
            //recorremos por cada vista guardada
            _.each(this.iViews,
                function(opView) {
                    //removemos la vista
                    opView.remove();
                }
            );

            //create /update array view
            this.iViews = [];
           
           
            //send model the method addOne
            this.collection.each(this.addOne);
        },
        addOne: function(modl){

            // Instantiate the View
            var iView = new iteration_view({
                model: modl
            });

           

            //Add collection in view
            iView.collection = this.collection;
            iView.app_router =  this.app_router;
            
            //Add view in array
            this.iViews.push(iView);

            //Add view in HomeView
            $(this.el).append(iView.el);
        },
		


	});


	return View;

}); 