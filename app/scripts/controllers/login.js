'use strict';

var aprendiApp = angular.module('aprendiApp');

aprendiApp.controller('LoginCtrl', function ($scope, $http) {
	$http.get('http://localhost:6660/home').success(function(data){
        $scope.id = data;
    });
});
