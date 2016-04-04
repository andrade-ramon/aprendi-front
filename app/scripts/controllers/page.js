app.controller('PageCtrl', function ($scope, $localStorage) {
    $scope.isLogged = false;

	if($localStorage.token){
        $scope.isLogged = true;
    }

});
