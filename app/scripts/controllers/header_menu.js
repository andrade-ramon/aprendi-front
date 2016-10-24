app.controller('HeaderMenuCtrl', function ($scope, $location) {
	$scope.search = {};
	
	$scope.searchItems = [{ 
		id: 'college',
		label: 'Faculdades'
	}, { 
		id: 'course',
		label: 'Cursos'
	}];
	
	if($location.path().split("/")[1] !== "cursos") {
		$scope.searchType = $scope.searchItems[0];
	} else {
		$scope.searchType = $scope.searchItems[1];
	}
	$scope.loginUrl = '/login?redirectAfterLogin=' + $location.path();

    $scope.search = function() {
    	var searchType = document.getElementById("header-search").value;
    	if(searchType === "college") {
        	$location.path('/faculdades/pesquisa/' + $scope.search.query);
        } else if(searchType === "course") {
        	$location.path('/cursos/pesquisa/' + $scope.search.query);
        }
    };
    // https://www.facebook.com/RockWins/videos/1195040287278262/
});
