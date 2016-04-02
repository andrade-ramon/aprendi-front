app.controller('RegisterCtrl', function ($scope, $http, $localStorage, $location, ENV) {

	$scope.user = {};

	$scope.register = function() {
	    $http.post(ENV.API.REGISTER, $scope.user).then(function(response) {
	        $localStorage.token = response.data.token;
            $location.path('/');
	    }, function(response) {
	    	$scope.msg = response.data.message;
	    });
	};
});