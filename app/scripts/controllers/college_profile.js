app.controller('CollegeProfileCtrl', function ($scope, $http, $routeParams,$location, messagesContainer, ENV) {

	var collegeId = $routeParams.collegeId;

	$http({
		url: ENV.API.COLLEGE.PROFILE + collegeId
	}).then(function success(response) {
	    $scope.college = response.data;
	    $scope.commentsUrl = '/colleges/' + collegeId + '/comments';
	}, function error(response) {
		if (response.status === 404) {
			messagesContainer.addError("Faculdade não encontrada");
			$location.path('/');
		}
	});

	$scope.timeline = {};
	$scope.timeline.posts = [
		{createdAt: "4min", content: "In sem justo, commodo ut, suscipit at, pharetra vitae, orci. Duis sapien nunc, commodo et, interdum suscipit, sollicitudin et, dolor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam id dolor. Class aptent taciti sociosqu ad litora"},
		{createdAt: "30min", content: "In sem justo, commodo ut, suscipit at, pharetra vitae, orci. Duis sapien nunc, commodo et, interdum suscipit, sollicitudin et, dolor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam id dolor. Class aptent taciti sociosqu ad litora In sem justo, commodo ut, suscipit at, pharetra vitae, orci. Duis sapien nunc, commodo et, interdum suscipit, sollicitudin et, "}
	];
	
	$scope.courses = [{id: 123, name: "NOME DO CURSO"}, {id: 456, name: "OUTRO CURSO"}];

	$scope.listCampus = function () {
		$http.get(ENV.API.COLLEGE.CAMPUS.replace(ENV.ARG1, collegeId)).then(function(response) {
            $scope.campus = response.data;
        });
	};
});