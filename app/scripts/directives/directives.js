var zeusDirectives = angular.module('zeusDirectives',[]);

zeusDirectives.directive('page',function() {
    return {
        restrict: 'E',
        transclude: true, 
        templateUrl: 'scripts/directives/page.html',
        link: function(scope, elem, attrs){
            scope.hasHeader = true;
            attrs.$observe('header', function(value){
                scope.hasHeader = value !== 'false';
            });            

            scope.hasFooter = true;
            attrs.$observe('footer', function(value){
                scope.hasFooter = value !== 'false';        
            });

            scope.headerWithForm = true;
            attrs.$observe('showSearch', function(value){                
                scope.headerWithForm = value !== 'false';
            });
        }
    }; 
});

zeusDirectives.directive('headerMenu', function () {
    return {
        restrict: 'E',
        transclude: false,
        templateUrl: 'scripts/directives/header_menu.html', 
        link: function(scope, elem, attrs) {
            scope.searchForm = true;
            attrs.$observe('searchForm', function(value){
                scope.searchForm = value !== 'false';
            });
        }
    };
});

zeusDirectives.directive('logo',function() {
    return {
        restrict: 'E',
        transclude: false, 
        templateUrl: 'scripts/directives/logo.html',
        link: function(scope, elem, attrs){
            scope.smallLogo = scope.mediumLogo = scope.bigLogo = false;
            attrs.$observe('size', function(value){
                scope.smallLogo = value === 'small';
                scope.mediumLogo = value === 'medium';
                scope.bigLogo = value === 'big';
            });            
        }
    }; 
});

zeusDirectives.directive('navigationMenu', function () {
    return {
        restrict: 'E',
        transclude: false,
        templateUrl: 'scripts/directives/navigation_menu.html'
    };
});

zeusDirectives.directive('pagination',function($filter) {
    $filter('range')('argument');
    return {
        restrict: 'E',
        transclude: false, 
        templateUrl: 'scripts/directives/pagination.html',
        link: function(scope, elem, attrs){
            attrs.$observe('totalPages', function(value){
                scope.totalPages = value;
            });

            attrs.$observe('page', function(value){
                scope.page = value;
            });
        }
    }; 
});

zeusDirectives.filter('range', function() {
  return function(numbers, total) {
    total = parseInt(total);

    for (var i=0; i<total; i++) {
      numbers.push(i);
    }

    return numbers;
  };
});