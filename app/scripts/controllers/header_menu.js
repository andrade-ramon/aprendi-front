app.controller('HeaderMenuCtrl', function ($scope, $location) {
	$scope.search = {};
	$scope.loginUrl = '/login?redirectAfterLogin=' + $location.path();

    $scope.search = function() {
        $location.path('/faculdades/pesquisa/' + $scope.search.query);
    };
});
