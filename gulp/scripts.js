(function () {
    'use strict';
    var gulp = require('gulp');
    var inject = require('gulp-inject');
    var util = require('gulp-util');
    var express = require('express');
    var angularFilesort = require('gulp-angular-filesort');

    var srcFiles = ['./src/app/**/*.js'];
    var cssFiles = [
        './src/bower_components/bootstrap/dist/css/bootstrap.min.css',
        './src/bower_components/bootstrap/dist/css/bootstrap-theme.min.css',
        './src/content/**/*.css'
    ];
    var libs = [
        'jquery/dist/jquery.min.js',
        'angular/angular.min.js',
        'angular-route/angular-route.min.js',
        'firebase/firebase.js',
        'angularfire/dist/angularfire.min.js',
        'bootstrap/dist/js/bootstrap.min.js'
    ];

    gulp.task('index', function () {
        var target = gulp.src('./src/index.html');
        var sources = gulp.src(srcFiles).pipe(angularFilesort());
        var css = gulp.src(cssFiles, {read: false});
        var libraries = gulp.src(libs, {read: false, cwd: './src/bower_components/'});

        return target
            .pipe(inject(libraries, {relative: true, name: 'thirdparty'}))
            .pipe(inject(sources, {relative: true}))
            .pipe(inject(css, {relative: true}))
            .pipe(gulp.dest('./src'));
    });

    gulp.task('server', ['index'], function () {
        var app = express();
        app.use(express.static('./src'));
        var server = app.listen(util.env.port || 3000, function () {
            console.log('%d listening on port %d', process.pid, server.address().port);
        });
    });
})();
