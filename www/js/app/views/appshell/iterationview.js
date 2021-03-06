define([
    'backbone',
    'mustache',
     'text!app/templates/dashboard/iterationview.html',
      'app/views/appshell/storyview'
   
   
   
   

], function( Backbone , Mustache , template ,storyview  ){ 

	var View = Backbone.View.extend({ 
		el:$(".page-content"),
		initialize: function(){

            // this.listenTo(this.model, 'change', this.render);
            // this.listenTo(this.model, 'sync', this.render);
            
            this.iViews = [];
        },
		render: function() { 

			//$(this.el).html(   this.model.getTitle() + " | " +this.model.get('story_count') + " | " + this.model.get('suma_puntos') ) ;

			

            var project = this.model.get('project');
			$(this.el).html(Mustache.to_html( template , this.model.toJSON()   ) );
			

			this.collection = this.model.get('stories');
			 _.bindAll(this, 'addOne', 'addAll');

			
			this.addAll();

            $('.ptitle').html( project.name )

		},
		 addAll: function(){
           
           
        
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
            var iView = new storyview({
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