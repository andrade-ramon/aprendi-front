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

window.routes = {
    "/": {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl',
    },
    "/login": {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        onlyGuest: true
    },
    "/cadastro": {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl',
        onlyGuest: true
    }
};

app.config(function ($routeProvider, $locationProvider) {
    for(var path in window.routes) {
        $routeProvider.when(path, window.routes[path]);
    }
    $routeProvider.otherwise({redirectTo: '/404'});
    $locationProvider.html5Mode(true);
});

app.run(function($rootScope, $location, User, ENV) {
    $rootScope.$on("$locationChangeStart", function(event, nextRoute) {
        
        nextRoute = nextRoute.replace(ENV.URL,"");

        if(typeof window.routes[nextRoute] !== 'undefined') {
            if(window.routes[nextRoute].onlyLogged && !User.isLogged()) {
                event.preventDefault();
                $location.path('/login');
            } else if(window.routes[nextRoute].onlyGuest && User.isLogged()) {
                event.preventDefault();
                $location.path('/');
            }
        }
    });
});
