var inventoryApp = angular.module('inventoryApp', ['ngRoute','ui.select2','ngAnimate']);

inventoryApp.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl : 'pages/dashboard.html',
            controller  : 'DashboardCtrl'
        })
        .when('/history_place', {
            templateUrl : 'pages/history_place.html',
            controller  : 'HistoryPlaceCtrl'
        })
        .when('/history_stuff', {
            templateUrl : 'pages/history_stuff.html',
            controller  : 'HistoryStuffCtrl'
        })
        .when('/places', {
            templateUrl : 'pages/places.html',
            controller  : 'PlacesCtrl'
        })
        .when('/stuff_edit', {
            templateUrl : 'pages/stuff_edit.html',
            controller  : 'StuffEditCtrl'
        })
        .when('/stuffs', {
            templateUrl : 'pages/stuffs.html',
            controller  : 'StuffsCtrl'
        })
});

inventoryApp.run(function($rootScope,$location){
    $rootScope.go=function(path,param){
        $location.path(path);
        for (prop in $location.search())
            $location.search(prop, null);
        if(param){
            $location.search(param);
        }
    }
});

inventoryApp.directive('contenteditable', function() {
    return {
        restrict: 'A', // only activate on element attribute
        require: '?ngModel', // get a hold of NgModelController
        link: function(scope, element, attrs, ngModel) {
            if(!ngModel) return; // do nothing if no ng-model

            // Specify how UI should be updated
            ngModel.$render = function() {
                element.html(ngModel.$viewValue || '');
            };

            // Listen for change events to enable binding
            element.on('blur keyup change', function() {
                scope.$apply(read);
            });
            read(); // initialize

            // Write data to the model
            function read() {
                var html = element.html();
                // When we clear the content editable the browser leaves a <br> behind
                // If strip-br attribute is provided then we strip this out
                if( attrs.stripBr && html == '<br>' ) {
                    html = '';
                }
                ngModel.$setViewValue(html);
            }
        }
    };
});