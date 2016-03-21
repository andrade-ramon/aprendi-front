app.controller('LoginCtrl', function ($scope, $http) {
	$http.get("ENV.API" + "/login" ).success(function(data){
        $scope.teste = data;
    });
});
