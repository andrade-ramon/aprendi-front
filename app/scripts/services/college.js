app.service('College', function($location, messagesContainer, $http, $filter, ENV) {

    this.getInfo = function(collegeId, callback) {
        var college = {};
        college.alreadyRated = true;

        $http({
            url: ENV.API.COLLEGE.PROFILE + collegeId
        }).then(function success(response) {
            college = response.data;
            callback.success(college);
        }, function error(response) {
            if (response.status === 404) {
                callback.notFound();
                return;
            }
        });

        var params = $filter('addParam')('type', 'GENERAL_RANK');

        $http({
            url: ENV.API.COLLEGE.RANKING.replace(ENV.ARG1, collegeId) + params
        }).then(function success(response) {
            callback.successRanking(response.data);
        }, function error() {
            callback.notFound();
            return;
        });
    };
});