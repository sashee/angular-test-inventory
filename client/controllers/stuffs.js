inventoryApp.controller('StuffsCtrl', function StuffsCtrl($scope,$http) {

    function refreshStuffs(){
        $http.get('/rest/stuff').success(function(data){
            $scope.stuffs=data;
            $scope.editStuffs=angular.copy(data);
        });
    }
    refreshStuffs();

    $http.get('/rest/place').success(function(data){
        $scope.places=data;
    });

    $scope.findEditStuff=function(stuffId){
        return _.find($scope.editStuffs,function(s){
            return s.id===stuffId;
        });
    };

    $scope.findPlaceById=function(placeId){
        return _.find($scope.places||[],function(place){
            return place.id===placeId;
        });
    };

    $scope.save=function(stuffId){
        $http.post('/rest/stuff',$scope.findEditStuff(stuffId)).success(function(){
            refreshStuffs();
            $scope.showEdit=null;
        });
    }

    $scope.create=function(){
        $http.post('/rest/stuff/new',{name:$scope.name}).success(function(){
            refreshStuffs();
            $scope.showCreate=false;
        });
    }
});