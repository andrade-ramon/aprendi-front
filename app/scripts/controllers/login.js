app.controller('LoginCtrl', function ($scope, $http) {
	$http.get('http://localhost:6660/home').success(function(data){
        $scope.id = data;
    });
});
