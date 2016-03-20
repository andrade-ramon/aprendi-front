var myDirectives = angular.module('myDirectives',[]);

myDirectives.directive('tagPage',function() {
    return {
        restrict: 'E',
        transclude: true, 
        templateUrl: 'scripts/directives/page.html',
        controller: 'PageCtrl',
        link: function(scope, elem, attrs){
            scope.hasHeader = true;
            attrs.$observe('header', function(value){
                scope.hasHeader = value != 'false';
            });            

            scope.hasFooter = true;
            attrs.$observe('footer', function(value){
                scope.hasFooter = value != 'false';        
            });
        }
    }; 
});