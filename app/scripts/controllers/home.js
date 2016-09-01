app.controller('HomeCtrl', function ($scope, $location) {
	$scope.search = {};

    $scope.collegeSearch = function() {
        $location.path('/faculdades/pesquisa/' + $scope.search.query);
    };
});
