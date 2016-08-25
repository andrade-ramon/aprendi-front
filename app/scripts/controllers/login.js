app.controller('LoginCtrl', function ($scope, $http, $location, ENV, User, ezfb) {
    $scope.user = {};

    $scope.login = function() {
        $http.post(ENV.API.LOGIN, $scope.user).then(function(response) {
            User.loggedIn(response.data.token);
            $location.path('/');
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
                    $('#password').focus();
                }
            }
        });
    };

    $scope.loginFacebook = function () {
        ezfb.login(function (res) {
          if (res.status === "connected") {
            $http.post(ENV.API.FACEBOOKLOGIN, res.authResponse.accessToken).then(function(response){
                User.loggedIn(response.data.token);
                $location.path('/');
            });
          }
        }, {scope: 'email'});
    };

    $scope.logout = function() {
        User.loggedOut();
        $location.path('/');
        location.reload();
    };
});
