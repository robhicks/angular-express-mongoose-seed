"use strict";

module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jasmine_node: {
            specNameMatcher: "spec",
            projectRoot: ".",
            requirejs: false,
            forceExit: true,
            jUnit: {
                report: false,
                savePath: "./build/reports/jasmine/",
                useDotNotation: true,
                consolidate: true
            }
        },
        karma:{
            unit: {
                options: {
                    files : [
                        'app/bower/angular/angular.js',
                        'app/js/**/*.js',
                        'test/unit/**/*.js'
                    ],

                    autoWatch : true,

                    frameworks: ['jasmine'],

                    browsers : ['Chrome'],

                    plugins : [
                        'karma-junit-reporter',
                        'karma-chrome-launcher',
                        'karma-firefox-launcher',
                        'karma-script-launcher',
                        'karma-jasmine'
                    ]
                }
            }
        },
        watch: {
            files: ['*.js', './spec/*.js'],
            tasks: ['jasmine_node']
        },
        uglify:{
            options: {
                mangle: false
            }
        }
    });

    grunt.loadNpmTasks('grunt-jasmine-node');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', function () {
        grunt.log.subhead(">>> Use 'grunt jasmine' to run Jasmine specs");
    });

    grunt.registerTask("jasmine", ["jasmine_node"]);
};