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

app.directive('tagPage',function() {
    return {
        restrict: 'E',
        transclude: true, 
        templateUrl: 'views/page.tag.html',
        controller: 'PageCtrl',
        link: function(scope, elem, attrs){
            scope.hasHeader = true;
            attrs.$observe('header', function(value){
                scope.hasHeader = value != 'false';
            });            

            scope.hasFooter = true;
            attrs.$observe('footer', function(value){
                scope.hasFooter = value != 'false';        
            });
        }
    }; 
});







