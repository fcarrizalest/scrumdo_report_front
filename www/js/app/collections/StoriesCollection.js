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



    return Stories;
});