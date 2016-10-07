app.service('Facebook', function(ENV, User, $location, $http, ezfb) {

	this.loginFacebook = function(){
		ezfb.login(function (res) {
          if (res.status === "connected") {
            var data = {accessToken: res.authResponse.accessToken };
            $http.post(ENV.API.FACEBOOKLOGIN, data).then(function(response){
                User.loggedIn(response.data.token);
                $location.path('/');
            });
          }
        }, {scope: 'email'});
	};
	
});