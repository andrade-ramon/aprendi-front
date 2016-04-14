'use strict';

var app = angular.module('app', [
    'ngRoute',
    'ngSanitize',
    'ngStorage',
    'zeusDirectives',
    'angularValidator',
    'growlNotifications',
    'ngAnimate'
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
    .when('/cadastro', {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl'
    })
    .otherwise({
        templateUrl: '404.html',
        controller: 'ErrorCtrl'
    }); 

    $locationProvider.html5Mode(true);
});
