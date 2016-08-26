app.controller('HomeCtrl', function ($scope, $location) {
	$scope.search = {};

    $scope.search = function() {
        $location.path('/pesquisa/' + $scope.search.query);
    };
});
