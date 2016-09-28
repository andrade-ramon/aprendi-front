app.controller('CollegeProfileCtrl', function (User, $scope, $http, $route, $routeParams,$location, messagesContainer, ENV) {

    $scope.comment = {};
    $scope.reply = {};

    var collegeId = $routeParams.collegeId;
    $scope.loginThenCommentsUrl =  '/login?redirectAfterLogin=' + encodeURIComponent('/faculdades/' + collegeId);

    var user = {};
    if (User.isLogged()) {
        $http.get(ENV.API.USER.CURRENT).then(function(response) {
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

    $scope.courses = [{id: 123, name: "NOME DO CURSO"}, {id: 456, name: "OUTRO CURSO"}];

    $scope.listCampus = function () {
        $http.get(ENV.API.COLLEGE.CAMPUS.replace(ENV.ARG1, collegeId)).then(function(response) {
            $scope.campus = response.data;
        });
    };

    var listComments = function() {
        $http({
            url: ENV.API.COLLEGE.COMMENTS.ALL.replace(ENV.ARG1, collegeId)
        }).then(function success(response) {
            $scope.timeline.conversations = response.data;
        }, function error() {
            $scope.timeline.conversations = [];
        });
    };
    listComments();
    
    $scope.leaveComment = function() {
        $http({
            method: 'POST',
            url: ENV.API.COLLEGE.COMMENTS.NEW.replace(ENV.ARG1, collegeId),
            data: {'messageText': $scope.comment.text}
        }).then(function success() {
            listComments();
            $('#comments-tab').attr('checked', true);
            $scope.comment.text = '';
        }, function error() {
            messagesContainer.addError("Não foi possivel deixar um comentário, tente mais tarde");
            $route.reload();
        });
    };

    $scope.replyComment = function(conversationId, index) {
        if($scope.reply.text === ''){

        }
        $http({
            method: 'PATCH',
            url: ENV.API.COLLEGE.COMMENTS.REPLY.replace(ENV.ARG1, collegeId).replace(ENV.ARG2, conversationId),
            data: {'messageText': $scope.reply.text}
        }).then(function success(response) {
            var lastMessageIndex = response.data.messages.length - 1;
            $scope.timeline.conversations[index].messages.push(response.data.messages[lastMessageIndex]);
            $scope.reply.text = "";
        }, function error() {
            messagesContainer.addError("Não foi possível responder um comentário, tente mais tarde");
            $route.reload();
        });
    };

    $scope.canLoggedUserReply = function(studentId) {
        return user.id === studentId;
    };

    $scope.isFromStudent = function(message) {
        return message.direction === 'STUDENT_TO_COLLEGE';
    };

    $scope.isFromCollege = function(message) {
        return message.direction === 'COLLEGE_TO_STUDENT';
    };

    $scope.isSequentialMessage = function(messages, index) {
        if (index === 0){
            return false;
        }
        return messages[index].direction === messages[index -1].direction;
    };

    $scope.focusText = function() {
        angular.element('textarea[name="comment"]').focus();
    };

    $scope.asignStudent = function() {
        $http({
            method: 'POST',
            url: ENV.API.COLLEGE.COMMENTS.REPLY.replace(ENV.ARG1, collegeId).replace(ENV.ARG2, conversationId),








            
            data: {'messageText': $scope.reply.text}
        }).then(function success(response) {
            var lastMessageIndex = response.data.messages.length - 1;
            $scope.timeline.conversations[index].messages.push(response.data.messages[lastMessageIndex]);
            $scope.reply.text = "";
        }, function error() {
            messagesContainer.addError("Não foi possível responder um comentário, tente mais tarde");
            $route.reload();
        });     
    };
});