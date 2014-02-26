inventoryApp.controller('PlacesCtrl', function PlacesCtrl($scope,$http) {
    function refreshPlaces(){
        $http.get('/rest/place').success(function(data){
            $scope.places=data;
            $scope.editPlaces=angular.copy(data);
        });
    }

    refreshPlaces();

    $scope.selectPlace=function(placeId){
        if($scope.selectedPlaceId===placeId){
            $scope.selectedPlaceId=null;
        }else{
            $scope.selectedPlaceId=placeId;
        }
    }

    $scope.getEditPlace=function(place){
        return _.find($scope.editPlaces,function(editPlace){
            return editPlace.id===place.id;
        });
    }

    $scope.savePlace=function(editPlace){
        $http.post('/rest/place',editPlace).success(function(){
            refreshPlaces();
            $scope.selectedPlaceId=null;
        });
    }

    $scope.create=function(){
        $http.post('/rest/place/new',{name:$scope.name,description:$scope.description}).success(function(){
            refreshPlaces();
            $scope.selectedPlaceId=null;
            $scope.showCreate=false;
        });
    }

    $scope.isUnchanged = function(place) {
        return angular.equals(place, $scope.getEditPlace(place));
    };
});