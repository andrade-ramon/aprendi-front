app.controller('LoginCtrl', function ($scope, $http, $localStorage, $location, ENV) {
    $scope.user = {};
    $scope.login = function() {
        $http.post(ENV.API.LOGIN, $scope.user)
        .then(function(response) {
            $localStorage.token = response.data.token;
            $location.path('/');
        }, function(response) {
            $scope.msg = response.data.message;
        });
    };
});
