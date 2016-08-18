app.controller('HomeCtrl', function ($scope, $location) {
	$scope.search = {};

    $scope.search = function() {
        $location.path('/search/' + $scope.search.query);
    };
});
