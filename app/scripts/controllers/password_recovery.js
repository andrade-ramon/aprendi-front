app.controller('PasswordRecoveryCtrl', function ($scope, $routeParams, $http, $location, ENV, messagesContainer) {

	$scope.emailValidator = function(email){
		if(email === undefined) {
			return false;
		}
		var emailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*$/;
    	return emailRegex.test(email);
	};

	$scope.recoverAccount = function() {
	    $http.post(ENV.API.PASSWORDRECOVERY_REQUEST, $scope.passwordrecovery.login).then(function(response) {
	    	if (response.data){
	    		messagesContainer.addSuccess("Se o login informado foi encontrado, um e-mail com instruções para redefinir a senha foi enviado!");
            	$location.path('/');
        	}else{
        		messagesContainer.addError("Falha ao processar a solicitação de redefinição de senha");
            	$location.path('/');
        	}
	    }, function(response) {
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

	$scope.changePasswordByToken = function(){
		var test = {password: $scope.passwordrecovery.password,
				token: $routeParams.token};
		$http.post(ENV.API.PASSWORDRECOVERY_CHANGE, test).then(function(response) {
	    	if (response.data){
	    		messagesContainer.addSuccess("Senha alterada com sucesso! Basta fazer o login com a senha cadastrada");
            	$location.path('/');
        	}else{
        		messagesContainer.addError("Falha ao alterar a senha");
            	$location.path('/');
        	}
	    }, function(response) {
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
