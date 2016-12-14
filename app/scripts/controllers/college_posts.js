app.controller('CollegePostsCtrl', function (User, $scope, $routeParams, $http, ENV) {

    var collegeId = $routeParams.collegeId,
        collegeLogged = false;

    $scope.post = {};
    
    if (User.isLogged()) {
        $http.get(ENV.API.COLLEGE.CURRENT).then(function(response) {
            collegeLogged = response.data.id === parseInt(collegeId);
        });
    }
    
    var listPosts = function() {
        $http({
            url: ENV.API.COLLEGE.POSTS.replace(ENV.ARG1, collegeId)
        }).then(function success(response) {
            $scope.timeline.posts = response.data;
        }, function error() {
            $scope.timeline.posts = [];
        });
    };
    listPosts();

    $scope.leavePost = function() {
        $http({
            method: 'POST',
            url: ENV.API.COLLEGE.POSTS.replace(ENV.ARG1, collegeId),
            data: {'message': $scope.post.text}
        }).then(function success() {
            listPosts();
            $scope.post.text = '';
        }, function error() {
            messagesContainer.addError("Não foi possivel escrever um novo post, tente mais tarde");
            $route.reload();
        });
    };
});