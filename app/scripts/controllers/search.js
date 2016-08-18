app.controller('SearchCtrl', function ($scope, $http, $routeParams, ENV) {
    var query = $routeParams.query;

    $http.get(ENV.API.SEARCH.ALL + query).then(function(response) {
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
