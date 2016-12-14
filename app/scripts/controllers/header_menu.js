app.controller('HeaderMenuCtrl', function ($scope, $location, User, $http, ENV) {
	$scope.search = {};
	

	var collegeLogged = false;
	$scope.collegeId = null;

    if (User.isLogged()) {
        $http.get(ENV.API.COLLEGE.CURRENT).then(function(response) {
        	$scope.collegeId = response.data.id;
            collegeLogged = true;
        });
    }
    $scope.isCollegeLogged = function() {
        return collegeLogged;
    };


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
});
