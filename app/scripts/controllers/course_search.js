app.controller('CourseSearchCtrl', function ($scope, $http, $location, $routeParams, $filter, ENV) {
	$scope.search = {};
    $scope.filter = {};

    $scope.search.query = $routeParams.query;
    $scope.search.page = $routeParams.page === undefined ? '1' : $routeParams.page;

    //FIXME
    $scope.limitPages = 5;

    var searchApi = function (filters) {
        delete $scope.courses;

        $http.get(ENV.API.COURSE.SEARCH + $scope.search.query + filters).then(function(response) {
            $scope.courses = response.data;

            $scope.courses.result.forEach(function(course){
                if(course.modality === "PRESENTIAL"){
                    course.modality = "Presencial";
                } else {
                    course.modality = "A Distância";
                }

                switch(course.degree){
                    case "BACHELOR":
                        course.degree = "Bacharelado";
                        break;
                    case "GRADUATION":
                        course.degree = "Licenciatura";
                        break;
                    case "SEQUENTIAL":
                        course.degree = "Tecnológico";
                        break;
                    case "TECHNOLOGIST":
                        course.degree = "Sequencial";
                        break;
                }
            });

            //FIXME - Limitar no backend
            if($scope.courses.totalPages > $scope.limitPages) {
            	$scope.courses.totalPages = $scope.limitPages;
            }
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

    searchApi('?page=' + $scope.search.page);


    $scope.showCollegesForCourse = function(courseId, page) {
        delete $scope.colleges;

        var filters = "";
        if(typeof page !== "undefined"){
            filters = "?page=" + page;
        }
        $('.college-list').hide();
        $('#course-' + courseId).show();

        var coursesSearchUrl = ENV.API.COURSE.COLLEGES.replace(ENV.ARG1, courseId) + filters;
        $http.get(coursesSearchUrl).then(function(response) {
            $scope.colleges = {};
            $scope.colleges = response.data;

            var colleges = [];
            response.data.result.forEach(function(c){
                colleges[c.id] = {};
                colleges[c.id].id = c.id;
                colleges[c.id].name = c.name;
                colleges[c.id].initials = c.initials;
                colleges[c.id].addresses = [];
            });

            response.data.result.forEach(function(c){
                var collegeAddresses = {};
                collegeAddresses.address = c.address.trim();
                collegeAddresses.state = c.state;
                collegeAddresses.city = c.city.trim();

                colleges[c.id].addresses.push(collegeAddresses);
            });

            $scope.colleges.result = colleges;

            var results = [];
            var i = 0;
            $scope.colleges.result.forEach(function(college){
                results[i] = college;
                i++;
            });
            $scope.colleges.result = results;
        });
    };

});