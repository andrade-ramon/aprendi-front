app.controller('HeaderMenuCtrl', function ($scope, $location) {
	$scope.search = {};

    $scope.search = function() {
        $location.path('/faculdades/pesquisa/' + $scope.search.query);
    };
});
