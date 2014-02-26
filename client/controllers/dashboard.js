inventoryApp.controller('DashboardCtrl', function DashboardCtrl($scope,$http) {
    $http.get('/rest/place').success(function(data){
        $scope.places=data;
    });

    $http.get('/rest/stuff').success(function(data){
        $scope.stuffs=data;
    });

    $scope.stuffForPlaces=function(place){
        return _.filter($scope.stuffs || [],function(stuff){
            return stuff.at && stuff.at===place.id;
        });
    }
});