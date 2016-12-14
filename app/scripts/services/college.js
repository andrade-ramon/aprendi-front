app.service('College', function($location, messagesContainer, $http, $filter, ENV) {

    this.getRankInfo = function(collegeId, callback) {
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

        $http({
            url: ENV.API.COLLEGE.RANKING.replace(ENV.ARG1, collegeId)
        }).then(function success(response) {
            callback.successRanking(response.data);
        }, function error() {
            return;
        });
    };
});