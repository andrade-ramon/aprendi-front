app.controller('HomeCtrl', function ($scope, $location) {
	$scope.search = {};

    $scope.collegeSearch = function() {
        $location.path('/faculdades/pesquisa/' + $scope.search.query);
    };

    $scope.courseSearch = function() {
    	$location.path('/cursos/pesquisa/' + $scope.search.course.query);
    };
});
