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
        //shortcut paths
        templates: '../templates',
        msgbox_templates: '../msgbox_templates',
        // data: '../data',

        //require plugins
        text: '../typings/require/text', // https://www.safaribooksonline.com/library/view/developing-backbonejs-applications/9781449328535/ch04s03.html
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
        "jquery.countdown.min": ['jquery']
    }
});

require(["app"]);
