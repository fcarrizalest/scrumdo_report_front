define([
    'underscore',
    'backbone',
    'module',

], function(_, Backbone , module){


    console.log(module);

    var modelT = Backbone.Model.extend({
        urlRoot : module.config().basepath + "iterations",
        initialize: function() { 

            console.log(this);

            console.log(this.url() );
            var self = this;
            // setInterval(function() {
              self.fetch();
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