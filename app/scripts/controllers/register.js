app.controller('RegisterCtrl', function ($scope, $http, $localStorage, $location, ENV) {

	$scope.student = {};

	$scope.register = function() {
	    $http.post(ENV.API.REGISTER, $scope.student).then(function(response) {
	        $localStorage.token = response.data.token;
            $location.path('/');
	    }, function(response) {
			console.log(response);
	    	$scope.msg = response.data.message;
	    });
	};
});