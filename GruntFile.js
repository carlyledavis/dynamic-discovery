module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jasmine_node: {
            specNameMatcher: "spec", // load only specs containing specNameMatcher
            projectRoot: ".",
            requirejs: false,
            forceExit: true,
            jUnit: {
                report: false,
                savePath : "./build/reports/jasmine/",
                useDotNotation: true,
                consolidate: true
            }
        }
    });

    grunt.loadNpmTasks( 'grunt-mocha');
    grunt.loadNpmTasks( 'grunt-jasmine-node');

    grunt.registerTask( 'test', ['jasmine_node']);
};