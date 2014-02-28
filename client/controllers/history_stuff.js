inventoryApp.controller('HistoryStuffCtrl', function HistoryStuffCtrl($scope,$routeParams,$http) {
    $scope.stuffId=$routeParams.stuffId;

    $http.get('/rest/place').success(function(data){
        $scope.places=data;
    });

    $http.get('/rest/stuff/'+$scope.stuffId).success(function(data){
        $scope.stuff=data;
    });

    $scope.formatAt=function(at){
        return at? _.find($scope.places||[],function(place){
            return place.id===at;
        }).name:"Nowhere";
    }

    $scope.getHistoryDate=function(history){
        return history.date;
    }
});