app.controller('LinkCtrl', function ($scope, $location, $anchorScroll) {
	$scope.search = {};

    $scope.goToBottom = function() {
      $location.hash('header-menu');
      $anchorScroll();
    };
});
