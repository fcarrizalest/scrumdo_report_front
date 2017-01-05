define([
    'underscore',
    'backbone',
    'module',
    'app/collections/StoriesCollection',

], function(_, Backbone , module,Stories){


    


    var modelT = Backbone.Model.extend({
        urlRoot : module.config().basepath + "iterations",
        initialize: function() { 

            
            var self = this;
            // setInterval(function() {
              self.fetch();

              this.stories = new Stories();
              this.stories.url = module.config().basepath+'iterations/'+this.get('id')+'/stories';
              var suma_puntos = 0;
              var trabajando = 0 ;
              var terminados = 0;

              self.set('suma_puntos',0);

              this.stories.fetch( {success:function(collection,data,p3){

                collection.each(function(k,v){

                    suma_puntos += k.get('points');
                    var cell = k.get('cell');


                    if( cell.label == 'Doing' ){
                        trabajando += k.get('points');
                    }

                    if( cell.label != 'Doing' && cell.label != 'Todo' ){
                        terminados += k.get('points');
                    }

                    self.set('stories',collection);
                });

                self.set('suma_puntos',suma_puntos);
                self.set('suma_trabajando_puntos',trabajando);
                self.set('suma_terminados_puntos',terminados);


              }} );



            // }, 10000);

        },
         parse: function(data) {

            if( data.data == undefined )
                return data;
            else
                return data.data;
        },

        getTitle:function(){


            if( this.get('project') !== undefined ){
                var p =this.get('project');
                return p.name + " " + this.get('name');
            }

            return this.get('name');

                
        }

    });

    //Collection
    var Collection = Backbone.Collection.extend({

        model: modelT,
        //Parse
        parse: function(data) {

            return data.data;
        }
    });

    //Return Collection
    return Collection;

});