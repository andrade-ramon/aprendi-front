app.factory('AuthInterceptor', ['$q', '$location', '$localStorage', function ($q, $location, $localStorage) {
   	return {
		request: function (config) {
			config.headers = config.headers || {};
           	if ($localStorage.token) {
				config.headers.Authorization = $localStorage.token;
           	}
           	return config;
       	},
       	responseError: function (response) {
			if (response.status === 401) {
				delete $localStorage.token;
				$location.path('/login');
           	}
			return $q.reject(response);
       	}
   	};	
}]);

app.config(['$httpProvider', function ($httpProvider) {
	$httpProvider.interceptors.push('AuthInterceptor');
}]);