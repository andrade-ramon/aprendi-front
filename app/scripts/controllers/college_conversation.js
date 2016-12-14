app.controller('CollegeConversationCtrl', function (User, $scope, $http, $route, $routeParams, messagesContainer, ENV) {

	var collegeId = $routeParams.collegeId;
	var user = {};
    var collegeLogged = false;

    if (User.isLogged()) {
        $http.get(ENV.API.USER.CURRENT).then(function(response) {
            user = response.data;
        });

        $http.get(ENV.API.COLLEGE.CURRENT).then(function(response) {
            collegeLogged = response.data.id === parseInt(collegeId);
        });
    }

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

    var isCollegeLogged = function() {
        return collegeLogged;
    };
    
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
        return user.id === studentId || isCollegeLogged();
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

});