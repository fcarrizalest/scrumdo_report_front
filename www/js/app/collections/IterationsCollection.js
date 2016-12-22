define([
    'underscore',
    'backbone',
    'module',

], function(_, Backbone , module){


    var Stories = Backbone.Collection.extend({

         parse: function(data) {

            return data.data;
        }

    });


    var modelT = Backbone.Model.extend({
        urlRoot : module.config().basepath + "iterations",
        initialize: function() { 

            console.log(this);

            console.log(this.url() );
            var self = this;
            // setInterval(function() {
              self.fetch();

              this.stories = new Stories();
              this.stories.url = module.config().basepath+'iterations/'+this.get('id')+'/stories';
              var suma_puntos = 0;

              self.set('suma_puntos',0);


              this.stories.fetch( {success:function(collection,data,p3){

                collection.each(function(k,v){

                    suma_puntos += k.get('points');



                });

                self.set('suma_puntos',suma_puntos);


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