app.controller('CollegeSearchCtrl', function ($scope, $http, $location, $routeParams, $filter, ENV) {
    $scope.search = {};
    $scope.filter = {};

    $scope.search.query = $routeParams.query;
    $scope.page = $routeParams.page === undefined ? '1' : $routeParams.page;
    $scope.limitPages = 5;

    var searchApi = function (filters) {
        delete $scope.response;

        $http.get(ENV.API.COLLEGE.SEARCH + $scope.search.query + filters).then(function(response) {
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
