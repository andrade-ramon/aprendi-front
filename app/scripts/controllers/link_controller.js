app.controller('LinkCtrl', function ($scope) {
    $scope.goToTop = function() {
      $('body').scrollTop(0);
    };
});
