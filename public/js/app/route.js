define(["module","backbone","app/collections/iterationsCollection","app/views/appshell/appshell"],function(e,o,t,r){var n=o.Router.extend({routes:{"*actions":"defaultRoute"}}),i=function(){var i=new n,a=new t,l=new r(i,a),s=3,c=new Date;if(c.setDate(c.getDate()+(s+7-c.getDay())%7),a.url=e.config().basepath+"iterations/"+c.getFullYear()+"-"+(c.getMonth()+1)+"-"+c.getDate(),a.fetch({reset:!0}),console.log("pp"),console.log(e),void 0!=navigator.serviceWorker)if(navigator.serviceWorker.controller){console.log("tengo ya un controller");navigator.serviceWorker.controller.scriptURL}else navigator.serviceWorker.register("service-worker.js",{scope:"."}).then(function(e){});else console.log("Navegador sin SW");i.on("route:defaultRoute",function(){}),o.history.start(),l.render()};return{initialize:i}});