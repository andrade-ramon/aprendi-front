app.controller('SearchCtrl', function ($scope, $http, $location, $routeParams, $filter, ENV) {
    $scope.query = $routeParams.query;
    $scope.page = $routeParams.page === undefined ? '1' : $routeParams.page;
    $scope.filter = {};

    var searchApi = function (filters) {
        $http.get(ENV.API.SEARCH.COLLEGE + $scope.query + filters).then(function(response) {
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
    };

    searchApi('?page=' + $scope.page);

    $scope.searchFilter = function() {
        var params = $filter('addParam')('state', $scope.filter.state);
        $location.url($location.path() + params);
        searchApi(params);
    };
});
