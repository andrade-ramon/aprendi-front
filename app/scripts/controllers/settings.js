app.controller('SettingsCtrl', function ($scope, $routeParams, $http, $location, ENV, messagesContainer) {
	$scope.settings = {};

	$scope.updateInfo = function() {
	    $http.patch(ENV.API.USER.SETTINGS, $scope.settings).then(function(response) {
	    	console.log(response);
            messagesContainer.addSuccess("Dados alterados com sucesso!");
            $("form[name=passwordRecoveryForm],input").val("");
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
