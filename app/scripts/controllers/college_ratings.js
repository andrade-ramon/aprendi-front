app.controller('CollegeRatingsCtrl', function ($scope, $routeParams, $http, Rating, ENV) {

	var collegeId = $routeParams.collegeId;

	var listRatings = function() {
        $http({
            url: ENV.API.COLLEGE.RATINGS.replace(ENV.ARG1, collegeId)
        }).then(function success(response) {
            $scope.ratings = response.data;
        }, function error() {
            $scope.ratings = [];
        });
    };
    listRatings();

    $scope.formatOrigin = function(origin) {
        return Rating.Types[origin];
    };
});