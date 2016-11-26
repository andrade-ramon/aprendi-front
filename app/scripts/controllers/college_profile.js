app.controller('CollegeProfileCtrl', function (User, College, Rating, $scope, $http, $route, $routeParams,$location, messagesContainer, ENV) {

    $scope.comment = {};
    $scope.reply = {};
    $scope.assign = {};
    $scope.rating = {};
    $scope.ranking = {};
    $scope.timeline = {};

    var collegeId = $scope.collegeId = $routeParams.collegeId;
    var ratingTypes = Object.keys(Rating.Types);
    $scope.rating.current = ratingTypes[0];    

    College.getRankInfo(collegeId, {
        'success': function(college) {
            $scope.college = college;
        },
        'successRanking': function(ranking) {
            $scope.ranking = ranking;
        },
        'notFound': function() {
        }
    });
    
    $scope.commentsUrl = '/colleges/' + collegeId + '/comments';

    $scope.courses = [{id: 123, name: "NOME DO CURSO"}, {id: 456, name: "OUTRO CURSO"}];

    $scope.listCampus = function () {
        $http.get(ENV.API.COLLEGE.CAMPUS.replace(ENV.ARG1, collegeId)).then(function(response) {
            $scope.campus = response.data;
            console.log(response.data);
        });
    };

    $scope.focusText = function() {
        angular.element('textarea[name="comment"]').focus();
    };

    $scope.assignStudent = function() {
        var assignData = {};
        assignData.collegeAddressId = $scope.assign.collegeAddress.id;
        assignData.studentRa = $scope.assign.ra;
        assignData.collegeId = collegeId;
        $http.post(ENV.API.COLLEGE.ASSIGN.replace(ENV.ARG1, collegeId), assignData)
        .then(function success() {
            $('.modal').fadeOut();
            $('.modal-backdrop').fadeOut();
            messagesContainer.addSuccess("Registrado na faculdade");
        }, function error() {
            messagesContainer.addError("Não foi possível responder um comentário, tente mais tarde");
            $route.reload();
        });     
    };

    $scope.saveRating = function() {
        if (ratingTypes.length > 0) {

            var rating = {value: $scope.rating.grade, origin: $scope.rating.current};
            $http.post(ENV.API.COLLEGE.RATINGS.replace(ENV.ARG1, collegeId), rating);

            ratingTypes.shift();
            $scope.rating.current = ratingTypes[0];
            if (ratingTypes.length === 0 ) {
                $('.college-card .rating').hide();
                $('#rating-switch').delay(2000).queue(function(next) {
                    $(this).prop('checked', false);
                    next();
                });
                $scope.college.ratingsCount = $scope.college.ratingsCount + 1;
            }

        }
    };
}); 