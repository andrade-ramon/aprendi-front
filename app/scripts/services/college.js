app.service('College', function($location, messagesContainer, $http, ENV) {

    this.getBaseInfo = function(collegeId, scope) {
        scope.college = {};
        scope.college.alreadyRated = true;
        $http({
            url: ENV.API.COLLEGE.PROFILE + collegeId
        }).then(function success(response) {
            scope.college = response.data;
            scope.commentsUrl = '/colleges/' + collegeId + '/comments';
        }, function error(response) {
            if (response.status === 404) {
                messagesContainer.addError("Faculdade não encontrada");
                $location.path('/');
            }
        });
    };
});