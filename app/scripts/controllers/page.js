app.controller('PageCtrl', function ($scope, $localStorage, $location) {
    $scope.isLogged = false;

	if($localStorage.token){
        $scope.isLogged = true;
    }
    
    $scope.logout = function() {
        $localStorage.token = '';
        $location.path('/');
    };
});
