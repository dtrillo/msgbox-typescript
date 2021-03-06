/// <reference path="./typings/require.d.ts" />
/**
 * Application configuration declaration.
 */
require.config({
    baseUrl: 'ts/',
    paths: {
        //main libraries
        jquery: '../js/jquery',
        "bootstrap": '../js/bootstrap.min',
        "jquery.countdown.min": '../js/jquery.countdown.min',
        "jquery.serialize-object.min": "../js/jquery.serialize-object.min",
        //shortcut paths
        templates: '../templates',
        msgbox_templates: '../msgbox_templates',
        // data: '../data',
        //require plugins
        text: '../typings/require/text',
        tpl: '../typings/require/tpl',
        json: '../typings/require/json',
        hbs: '../typings/require-handlebars-plugin/hbs'
    },
    shim: {
        "jquery": {
            exports: '$'
        },
        "bootstrap": {
            deps: ['jquery']
        },
        "Handlebars": {
            exports: 'Handlebars'
        },
        "jquery.serialize-object.min": ['jquery'],
        "jquery.countdown.min": ['jquery']
    }
});
require(["app"]);
//# sourceMappingURL=config.js.map