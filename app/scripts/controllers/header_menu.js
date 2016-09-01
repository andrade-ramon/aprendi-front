app.controller('HeaderMenuCtrl', function ($scope, $location) {
	$scope.search = {};

    $scope.search = function() {
    	console.log($scope.search.type);
        $location.path('/faculdades/pesquisa/' + $scope.search.query);
    };
});
