app.controller('CollegeSearchCtrl', function ($scope, $http, $location, $routeParams, $filter, ENV) {
    $scope.search = {};
    $scope.filter = {};

    $scope.search.query = $routeParams.query;
    $scope.page = $routeParams.page === undefined ? '1' : $routeParams.page;
    $scope.filter.state = $routeParams.state === undefined ? '0' : $routeParams.state;
    $scope.filter.grade = $routeParams.grade === undefined ? '0' : $routeParams.grade;
    $scope.limitPages = 5;

    $scope.states = [{name:"SP"},{name:"AC"},{name:"AL"},{name:"AM"},{name:"AP"},{name:"BA"},{name:"CE"},{name:"DF"},{name:"ES"},{name:"EX"},{name:"GO"},{name:"MA"},{name:"MG"},{name:"MS"},{name:"MT"},{name:"PA"},{name:"PB"},{name:"PE"},{name:"PI"},{name:"PR"},{name:"RJ"},{name:"RN"},{name:"RO"},{name:"RR"},{name:"RS"},{name:"SC"},{name:"SE"},{name:"TO"}];


    var searchApi = function (filters) {
        $location.url('/faculdades/pesquisa/' + $scope.search.query + filters);
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

    $scope.searchFilter = function() {
        var state = $scope.filter.state;
        var minMecGrade = $scope.filter.grade;

        var params = "?page=" + $scope.page;
        if(typeof state !== 'undefined' && state !== '0') {
            params += "&state=" + state;
        }

        if(typeof minMecGrade !== 'undefined' && minMecGrade !== '0') {
            params += "&grade=" + minMecGrade;
        }
        searchApi(params);
    };
    $scope.searchFilter();

    $scope.showFilter = function() {
        if($('#filter-box').is(":visible")){
            $('#filter-box').slideUp();
            $('.trigger').removeClass('dropup');
        } else {
            $('#filter-box').slideDown();
            $('.trigger').addClass('dropup');
        }
    };

    $scope.changePage = function(page) {
        $scope.page = page;
        $scope.searchFilter();
    };
});
