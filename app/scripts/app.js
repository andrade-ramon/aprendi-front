'use strict';

var app = angular.module('app', [
    'ngRoute',
]);

app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
    })
    .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
    })
    .otherwise({
        templateUrl: '404.html',
        controller: 'ErrorCtrl'
    });

    $locationProvider.html5Mode(true);
});
