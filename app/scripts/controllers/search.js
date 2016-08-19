app.controller('SearchCtrl', function ($scope, $http, $routeParams, ENV) {
    $scope.query = $routeParams.query;
    $scope.page = $routeParams.page === undefined ? '1' : $routeParams.page;

    $http.get(ENV.API.SEARCH.ALL + $scope.query + '?page=' + $scope.page).then(function(response) {
        $scope.response = response.data;
    }, function(response) {
        if(response.data) {
            $scope.error = {};

            if(response.data.fieldErrors) {
                response.data.fieldErrors.forEach(function(fieldError){
                    $scope.error[fieldError.field] = fieldError.message;
                });
            }
        }
    });
});
