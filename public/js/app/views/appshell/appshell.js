define(["backbone","mustache","text!app/templates/dashboard/dashboard.html","app/views/appshell/iteration"],function(i,t,e,l){var o=i.View.extend({el:$("#lista"),initialize:function(i,t){this.app_router=i,this.collection=t,_.bindAll(this,"addOne","addAll"),this.collection.bind("reset",this.addAll,this.collection),this.collection.bind("remove",this.addAll,this.collection),this.collection.bind("add",this.addAll,this.collection),this.collection.bind("change",this.addAll,this.collection)},render:function(){$(this.el).html(t.to_html(e))},addAll:function(){console.log(2),_.each(this.iViews,function(i){i.remove()}),this.iViews=[],this.collection.each(this.addOne)},addOne:function(i){var t=new l({model:i});t.collection=this.collection,t.app_router=this.app_router,this.iViews.push(t),$(this.el).append(t.el)}});return o});