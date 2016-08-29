app.controller('PasswordRecoveryCtrl', function ($scope, $routeParams, $http, $location, ENV, messagesContainer) {
	$scope.user = {};

	var errorCallback = function(response) {
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
	};

	$scope.recoverAccount = function() {
	    $http.post(ENV.API.PASSWORDRECOVERY_REQUEST, $scope.user).then(function() {
	    	messagesContainer.addSuccess("Um e-mail com instruções para redefinir a senha foi enviado!");
	    }, function(response) {
	    	errorCallback(response);
	    });
	};

	$scope.changePasswordByToken = function(){
		var data = {password: $scope.user.password, token: $routeParams.token};
		$http.post(ENV.API.PASSWORDRECOVERY_CHANGE, data).then(function() {
	    	messagesContainer.addSuccess("Senha alterada com sucesso!");
        	$location.path('/login');
	    }, function(response) {
	    	errorCallback(response);
	    });
	};
});
