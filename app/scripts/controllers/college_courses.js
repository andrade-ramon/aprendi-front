app.controller('CollegeCoursesCtrl', function ($scope, $routeParams, ENV, $http, Course) {
	var collegeId = $routeParams.collegeId;

	var listCourses = function() {
		$http({
			url: ENV.API.COLLEGE.COURSES.replace(ENV.ARG1, collegeId)
		}).then(function success(response) {
			$scope.courses = response.data;
			$scope.courses.forEach(function(course){
				course.modality = Course.Modality[course.modality];
				course.degree = Course.Degree[course.degree];
			});
		}, function error() {
			$scope.courses = [];
		});
	};
	listCourses();
});