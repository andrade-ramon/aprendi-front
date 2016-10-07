app.service('College', function($localStorage, $rootScope, $http, ENV) {

    this.getBaseInfo = function(collegeId, scope) {
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