app.controller('CollegeProfileCtrl', function (User, College, Rating, $scope, $http, $route, $routeParams,$location, messagesContainer, ENV) {

    $scope.comment = {};
    $scope.reply = {};
    $scope.assign = {};
    $scope.rating = {};

    var ratingTypes = Rating.types();
    $scope.rating.current = ratingTypes[0];

    var collegeId = $scope.collegeId = $routeParams.collegeId;
    College.getBaseInfo(collegeId, $scope);

    $scope.timeline = {};
    $scope.timeline.posts = [
        {createdAt: "4min", content: "In sem justo, commodo ut, suscipit at, pharetra vitae, orci. Duis sapien nunc, commodo et, interdum suscipit, sollicitudin et, dolor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam id dolor. Class aptent taciti sociosqu ad litora"},
        {createdAt: "30min", content: "In sem justo, commodo ut, suscipit at, pharetra vitae, orci. Duis sapien nunc, commodo et, interdum suscipit, sollicitudin et, dolor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam id dolor. Class aptent taciti sociosqu ad litora In sem justo, commodo ut, suscipit at, pharetra vitae, orci. Duis sapien nunc, commodo et, interdum suscipit, sollicitudin et, "},
        {createdAt: "30min", content: "In sem justo, commodo ut, suscipit at, pharetra vitae, orci. Duis sapien nunc, commodo et, interdum suscipit, sollicitudin et, dolor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam id dolor. Class aptent taciti sociosqu ad litora In sem justo, commodo ut, suscipit at, pharetra vitae, orci. Duis sapien nunc, commodo et, interdum suscipit, sollicitudin et, "}
    ];

    $scope.courses = [{id: 123, name: "NOME DO CURSO"}, {id: 456, name: "OUTRO CURSO"}];

    $scope.listCampus = function () {
        $http.get(ENV.API.COLLEGE.CAMPUS.replace(ENV.ARG1, collegeId)).then(function(response) {
            $scope.campus = response.data;
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