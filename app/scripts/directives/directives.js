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

            attrs.$observe('mainClass', function(value){
                scope.mainClass = value;
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
        css: 'min/header_menu.css',
        link: function(scope, elem, attrs) {
            scope.searchForm = true;
            attrs.$observe('searchForm', function(value){
                scope.searchForm = value !== 'false';
            });
        }
    };
});

zeusDirectives.directive('footerMenu', function () {
    return {
        restrict: 'E',
        transclude: false,
        templateUrl: 'scripts/directives/footer_menu.html', 
        css: 'min/footer_menu.css'
    };
});

zeusDirectives.directive('logo',function() {
    return {
        restrict: 'E',
        transclude: false, 
        templateUrl: 'scripts/directives/logo.html',
        css: 'min/logo.css',
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
        templateUrl: 'scripts/directives/navigation_menu.html',
        css: 'min/navigation_menu.css',
    };
});

zeusDirectives.directive('pagination',function($filter) {
    $filter('range')('argument');
    return {
        restrict: 'E',
        transclude: false, 
        templateUrl: 'scripts/directives/pagination.html',
        css: 'min/pagination.css',
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