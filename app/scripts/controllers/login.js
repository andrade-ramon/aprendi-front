app.controller('LoginCtrl', function ($scope, $http, ENV) {
	$http.get(ENV.API.LOGIN).success(function(data){
        $scope.teste = data;
    });
});
