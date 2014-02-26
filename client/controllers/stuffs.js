inventoryApp.controller('StuffsCtrl', function StuffsCtrl($scope,$http) {
    $http.get('/rest/stuff').success(function(data){
        $scope.stuffs=data;
    });

    $http.get('/rest/place').success(function(data){
        $scope.places=data;
    });

    $scope.findPlaceById=function(placeId){
        return _.find($scope.places||[],function(place){
            return place.id===placeId;
        });
    }
});