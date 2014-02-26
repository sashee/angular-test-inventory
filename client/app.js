var inventoryApp = angular.module('inventoryApp', ['ngRoute']);

inventoryApp.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl : 'pages/dashboard.html',
            controller  : 'DashboardCtrl'
        })
        .when('/history', {
            templateUrl : 'pages/history.html',
            controller  : 'HistoryCtrl'
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