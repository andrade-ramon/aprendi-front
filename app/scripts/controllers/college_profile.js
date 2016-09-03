app.controller('CollegeProfileCtrl', function ($scope, $http, $routeParams, ENV) {

	$http({
		url: ENV.API.COLLEGE.PROFILE + $routeParams.collegeId
	}).then(function success(response) {
	    $scope.college = response.data;
	});

	$scope.timeline = {};
	$scope.timeline.posts = [
		{createdAt: "4min", content: "In sem justo, commodo ut, suscipit at, pharetra vitae, orci. Duis sapien nunc, commodo et, interdum suscipit, sollicitudin et, dolor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam id dolor. Class aptent taciti sociosqu ad litora"},
		{createdAt: "30min", content: "In sem justo, commodo ut, suscipit at, pharetra vitae, orci. Duis sapien nunc, commodo et, interdum suscipit, sollicitudin et, dolor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam id dolor. Class aptent taciti sociosqu ad litora In sem justo, commodo ut, suscipit at, pharetra vitae, orci. Duis sapien nunc, commodo et, interdum suscipit, sollicitudin et, "}
	];
	
	$scope.courses = [{id: 123, name: "NOME DO CURSO"}, {id: 456, name: "OUTRO CURSO"}];
});