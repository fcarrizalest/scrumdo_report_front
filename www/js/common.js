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
    }
});