app.controller('ConfigCtrl', function ($scope, $http, ENV) {
	$(document).ready(function(){
		$('#born_date').mask('99/99/9999');
	});

	$scope.user = {};

	$scope.saveProfileInfo = function() {
		console.log($scope.user);
		$http.post(ENV.API.USER, $scope.user).then(function(response) {
			console.log('certo');
			console.log(response);
		}, function(response) {
			console.log('errado');
			console.log(response);
		});
	};


});