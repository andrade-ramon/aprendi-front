app.controller('RankingCtrl', function ($scope, $http, ENV, $routeParams) {
	$scope.search = {};

	$scope.rank = {};
	$scope.rank.colleges = {};
	$scope.rank.type = "GENERAL_RANK";
	$scope.page = $routeParams.page === undefined ? '1' : $routeParams.page;

	$scope.loadRank = function(){
		$http({
			url: ENV.API.RANK.COLLEGE.replace(ENV.ARG1, $scope.rank.type) + '?page=' + $scope.page
		}).then(function success(response) {
			$scope.rank.colleges = response.data.result;
			$scope.rank.totalPages = response.data.totalPages;
			$scope.rank.actualPage = response.data.page;

		}, function error() {
			$scope.rank.colleges = [];
		});
	};
	$scope.loadRank();
});
