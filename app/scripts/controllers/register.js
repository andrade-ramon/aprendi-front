app.controller('RegisterCtrl', function ($scope, $http, $localStorage, $location, ENV) {
	if($localStorage.token){
        $location.path('/');
        return;
    }
    
	$scope.user = {};

	$scope.register = function() {
	    $http.post(ENV.API.REGISTER, $scope.user).then(function(response) {
	        $localStorage.token = response.data.token;
            $location.path('/');
	    }, function(response) {
	    	console.log(response);
	    	if(response.data) {
	    		$scope.error = {};

	    		if(response.data.fieldErrors) {
		    		response.data.fieldErrors.forEach(function(fieldError){
		    			$scope.error[fieldError.field] = fieldError.message;
		    		});
		    	}

		    	if(response.data.message) {
		    	 	$scope.error.generic = response.data.message;
		    	}
	    	}
	    });
	};
});