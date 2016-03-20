app.controller('LoginCtrl', function ($scope, $http,API) {
	$http.get(API.LOGIN).success(function(data){
        $scope.teste = data;
    });
});
