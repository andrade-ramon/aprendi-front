app.controller('LinkCtrl', function ($scope, $location, $anchorScroll) {
    $scope.goToTop = function() {
      $location.hash('site-top');
      $anchorScroll();
    };
});
