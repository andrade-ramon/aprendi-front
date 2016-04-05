app.controller('LoginCtrl', function ($scope, $http, $localStorage, $location, ENV) {
    if($localStorage.token){
        $location.path('/');
        return;
    }
    
    $scope.user = {};

    $scope.login = function() {
        $http.post(ENV.API.LOGIN, $scope.user).then(function(response) {
            $localStorage.token = response.data.token;
            $location.path('/');
        }, function(response) {
            $scope.msg = response.data.message;
            $('input[type=password]').focus();
            setTimeout(function() {
                $scope.msg = null;
            },3000);
        });
    };
    $scope.logout = function() {
        $localStorage.token = '';
        $location.path('/');
    };
});
