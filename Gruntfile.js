module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        protractor_webdriver: {
            options: {
                // Task-specific options go here.
            },
            a:{
                options: {
                    path: 'node_modules/protractor/bin/'
                }
            }
        },
        cucumberjs: {
            src: 'features',
            options: {
                format:'pretty'
            }
        },
        run: {
            options: {
                cwd:"server",
                wait:false
            },
            server:{
                args: ['server.js']
            }
        }
    });

    grunt.loadNpmTasks('grunt-protractor-webdriver');
    grunt.loadNpmTasks('grunt-cucumber');
    grunt.loadNpmTasks('grunt-run');

    grunt.registerTask('test',['run:server','protractor_webdriver:a','cucumberjs','stop:server'])

};