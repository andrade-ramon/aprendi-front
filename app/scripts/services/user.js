app.service('User', function($localStorage, $rootScope) {

	this.loggedIn = function(token) {
		this.setToken(token);
		$rootScope.isLogged = true;
	};

	this.loggedOut = function() {
		delete $localStorage.token;
		$rootScope.isLogged = false;
	};

	this.isLogged = function() {
		return ($localStorage.token);
	};

	this.getToken = function() {
		return $localStorage.token;
	};

	this.setToken = function(token){
		$localStorage.token = token;
	};

	$rootScope.isLogged = this.isLogged();
});