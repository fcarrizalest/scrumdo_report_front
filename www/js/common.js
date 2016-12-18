requirejs.config({
    baseUrl: 'js/lib',
    paths: {
        app: '../app'
    },
    shim: {
        backbone: {
            deps: ['jquery', 'underscore'],
            exports: 'backbone'
        },
        underscore: {
            exports: '_'
        }
    },
    config: {
        "app/route":{
            basepath : "https://a5429.herokuapp.com/api/"
        }
    }
});