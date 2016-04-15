app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push(function($q, $location, User) {
        return {
            request: function(config) {
                config.headers = config.headers || {};
                if(User.isLogged()){ 
                    config.headers.Authorization = User.getToken();
                }
                return config;
            },
            responseError: function(response) {
                if (response.status === 401) {
                    User.loggedOut();
                    $location.path('/login');
                }
                return $q.reject(response);
            }
        };      
    });
    
}]);