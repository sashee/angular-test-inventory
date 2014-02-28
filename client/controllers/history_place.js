inventoryApp.controller('HistoryPlaceCtrl', function HistoryPlaceCtrl($scope,$routeParams,$http) {
    $scope.placeId=$routeParams.placeId;

    $http.get('/rest/stuff').success(function(data){
        $scope.stuffs=data;
    });

    $http.get('/rest/place/'+$scope.placeId).success(function(data){
        $scope.place=data;
    });

    $scope.history=function(){
        if(!$scope.place){
            return [];
        }
        return _.flatten(_.map($scope.stuffs||[],function(stuff){
                return _.reduce(stuff.history||[],function(memo,history){
                    history.stuff=stuff.name;
                    if(history.at===$scope.placeId){
                        return {list:memo.list.concat([history]),next:true};
                    }else{
                        if(memo.next){
                            return {list:memo.list.concat([history]),next:false};
                        }else{
                            return memo;
                        }
                    }
                },{list:[],next:false}).list
        }))
    }

    $scope.formatAt=function(history){
        return history.at===$scope.placeId?history.stuff+' moved here':history.stuff+' moved away';
    }
});