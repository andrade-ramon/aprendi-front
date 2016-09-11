app.controller('CollegeProfileCtrl', function (User, $scope, $http, $route, $routeParams,$location, messagesContainer, ENV) {

    $scope.comment = {};
    $scope.reply = {};

    var collegeId = $routeParams.collegeId;
    $scope.loginThenCommentsUrl =  '/login?redirectAfterLogin=' + encodeURIComponent('/faculdades/' + collegeId);

    var user = {};
    if (User.isLogged()) {
        $http.get(ENV.API.USER.CURRENT).then(function (response) {
            user = response.data;
        });
    }

    $http({
        url: ENV.API.COLLEGE.PROFILE + collegeId
    }).then(function success(response) {
        $scope.college = response.data;
        $scope.commentsUrl = '/colleges/' + collegeId + '/comments';
    }, function error(response) {
        if (response.status === 404) {
            messagesContainer.addError("Faculdade não encontrada");
            $location.path('/');
        }
    });

    $scope.timeline = {};
    $scope.timeline.posts = [
        {createdAt: "4min", content: "In sem justo, commodo ut, suscipit at, pharetra vitae, orci. Duis sapien nunc, commodo et, interdum suscipit, sollicitudin et, dolor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam id dolor. Class aptent taciti sociosqu ad litora"},
        {createdAt: "30min", content: "In sem justo, commodo ut, suscipit at, pharetra vitae, orci. Duis sapien nunc, commodo et, interdum suscipit, sollicitudin et, dolor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam id dolor. Class aptent taciti sociosqu ad litora In sem justo, commodo ut, suscipit at, pharetra vitae, orci. Duis sapien nunc, commodo et, interdum suscipit, sollicitudin et, "},
        {createdAt: "30min", content: "In sem justo, commodo ut, suscipit at, pharetra vitae, orci. Duis sapien nunc, commodo et, interdum suscipit, sollicitudin et, dolor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam id dolor. Class aptent taciti sociosqu ad litora In sem justo, commodo ut, suscipit at, pharetra vitae, orci. Duis sapien nunc, commodo et, interdum suscipit, sollicitudin et, "}
    ];

    $http({
        url: ENV.API.COLLEGE.COMMENTS.ALL.replace(ENV.ARG1, collegeId)
    }).then(function success(response) {
        $scope.timeline.conversations = response.data;
    }, function error() {
        $scope.timeline.conversations = [];
    });
    
    $scope.courses = [{id: 123, name: "NOME DO CURSO"}, {id: 456, name: "OUTRO CURSO"}];

    $scope.listCampus = function () {
        $http.get(ENV.API.COLLEGE.CAMPUS.replace(ENV.ARG1, collegeId)).then(function(response) {
            $scope.campus = response.data;
        });
    };

    $scope.leaveComment = function () {
        $http({
            method: 'POST',
            url: ENV.API.COLLEGE.COMMENTS.NEW.replace(ENV.ARG1, collegeId),
            data: {'messateText': $scope.comment.text}
        }).then(function success() {
            messagesContainer.addSuccess("Aguarde a faculdade responder o comentario");
            $route.reload();
        }, function error() {
            messagesContainer.addError("Não foi possivel deixar um comentário, tente mais tarde");
            $route.reload();
        });
    };

    $scope.canLoggedUserReply = function(studentId) {
        return user.id === studentId;
    };

    $scope.replyComment = function(conversationId) {
        $http({
            method: 'PATCH',
            url: ENV.API.COLLEGE.COMMENTS.REPLY.replace(ENV.ARG1, collegeId).replace(ENV.ARG2, conversationId),
            data: {'messateText': $scope.reply.text}
        }).then(function success() {
            messagesContainer.addSuccess("Comentario respondido !");
            $route.reload();
        }, function error() {
            messagesContainer.addError("Não foi possivel responder um comentário, tente mais tarde");
            $route.reload();
        });
    };
});