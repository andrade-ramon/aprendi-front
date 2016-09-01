'use strict';

var app = angular.module('app', [
    'ngRoute',
    'ngSanitize',
    'ngStorage',
    'zeusDirectives',
    'angularValidator',
    'growlNotifications',
    'ngAnimate',
    'pascalprecht.translate',
    'ngCookies',
    'ezfb',
    'hljs'
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
    "/esqueci-minha-senha": {
        templateUrl: 'views/password_recovery.html',
        controller: 'PasswordRecoveryCtrl',
        onlyGuest: true
    },
    "/redefinir-senha/:token": {
        templateUrl: 'views/password_change.html',
        controller: 'PasswordRecoveryCtrl',
        onlyGuest: true
    },
    "/cadastro": {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl',
        onlyGuest: true
    },
    "/faculdades/pesquisa/:query": {
        templateUrl: 'views/college_search.html',
        controller: 'CollegeSearchCtrl'
    }
};

app.config(function ($routeProvider, $locationProvider, $translateProvider, ezfbProvider, ENV) {
    for(var path in window.routes) {
        $routeProvider.when(path, window.routes[path]);
    }
    $routeProvider.otherwise({redirectTo: '/404'});
    $locationProvider.html5Mode(true);

    $translateProvider.useStaticFilesLoader({
        prefix: 'scripts/i18n/messages-',
        suffix: '.json'
    });
    $translateProvider.useMissingTranslationHandlerLog();
    $translateProvider.preferredLanguage('pt_BR');
    $translateProvider.useLocalStorage();

    //FIXME - http://angular-translate.github.io/docs/#/guide/19_security
    $translateProvider.useSanitizeValueStrategy(null);

    ezfbProvider.setInitParams({
        appId: ENV.FACEBOOK.APPLICATION.ID,
        version: ENV.FACEBOOK.APPLICATION.VERSION
    });
});

app.constant('LOCALES', {
    'locales': {
        'pt_BR': 'Português'
    },
    'preferredLocale':'pt_BR'
});

app.run(function($rootScope, $location, User, ENV) {
    $rootScope.$on("$locationChangeStart", function(event, nextRoute) {
        
        nextRoute = nextRoute.replace(ENV.BASE_URL,"");

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

app.filter('addParam', function() {
  return function(key, value, url ) {
    if (value === undefined || key === undefined) { return ''; }
    if (url === undefined) { return '?' + key + '=' + value; }

    return url.includes('?') ?
            url + '&' + key + '=' + value :
            url + '?' + key + '=' + value ;
  };
});