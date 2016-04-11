app.service('messagesContainer', function($rootScope) {

    this.addError = function(message) {
        $rootScope.showMessage = true;
        $rootScope.growlMessage = message;
        $rootScope.growlType = "error";
    };
    this.addSuccess = function(message) {
        $rootScope.showMessage = true;
        $rootScope.growlMessage = message;
        $rootScope.growlType = "success";
    };
    this.addWarning = function(message) {
        $rootScope.showMessage = true;
        $rootScope.growlMessage = message;
        $rootScope.growlType = "warning";
    };
});

