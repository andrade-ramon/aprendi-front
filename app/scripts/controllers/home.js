'use strict';

var aprendiApp = angular.module('aprendiApp');

aprendiApp.controller('HomeCtrl', function ($scope, $http) {
    $http.get('http://localhost:6660/teste').success(function(data){
        $scope.id = data;
    });
});
