app.controller('PasswordRecoveryCtrl', function ($scope, $routeParams, $http, $location, ENV, messagesContainer) {
	$scope.passwordrecovery = {};


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
	    $http.post(ENV.API.PASSWORDRECOVERY_REQUEST, $scope.passwordrecovery).then(function() {
	    	messagesContainer.addSuccess("Um e-mail com instruções para redefinir a senha foi enviado!");
	    	$location.path('/');
	    }, function(response) {
	    	errorCallback(response);
	    	messagesContainer.addError("Falha ao processar a solicitação de redefinição de senha, verifique o email digitado!");
	    });
	};

	$scope.changePasswordByToken = function(){
		var newPassword = {password: $scope.passwordrecovery.password, token: $routeParams.token};
		$http.post(ENV.API.PASSWORDRECOVERY_CHANGE, newPassword).then(function() {
	    	messagesContainer.addSuccess("Senha alterada com sucesso!");
        	$location.path('/');
        	
	    }, function(response) {
	    	messagesContainer.addError("Falha ao alterar a senha");
	    	errorCallback(response);
	    });
	};
});
