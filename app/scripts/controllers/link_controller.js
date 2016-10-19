app.controller('LinkCtrl', function ($scope, $location, $anchorScroll) {
    $scope.goToBottom = function() {
      $location.hash('site-top');
      $anchorScroll();
    };
});
