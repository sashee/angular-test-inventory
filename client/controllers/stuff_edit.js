inventoryApp.controller('StuffEditCtrl', function StuffEditCtrl($scope,$routeParams,$http) {
    $scope.stuffId=$routeParams.stuffId;

    function refreshStuff(){
        $http.get('/rest/stuff/'+$scope.stuffId).success(function(data){
            $scope.stuff=data;
            $scope.originalStuff=angular.copy(data);
        });
    }

    refreshStuff();

    $scope.save=function(){
        $http.post('/rest/stuff',$scope.stuff).success(function(){
            refreshStuff();
        });
    }

    $scope.clickFileUpload=function(){
        $('#uploadPicture').click();
    }

    $scope.upload=function(){
        var data = new FormData();
        data.append('img',$('#uploadPicture')[0].files[0]);
        $.ajax({
            url: '/rest/stuff/'+$scope.stuffId+'/image',
            type: 'POST',
            data: data,
            cache: false,
            dataType: 'text',
            processData: false, // Don't process the files
            contentType: false, // Set content type to false as jQuery will tell the server its a query string request
            success: function(data, textStatus, jqXHR)
            {
                refreshStuff();
            },
            error: function(jqXHR, textStatus, errorThrown)
            {
                // Handle errors here
                console.log('ERRORS: ' + textStatus);
                console.log(errorThrown);
            }
        });
    };

    $scope.currentImage=0;

    $scope.prevImage=function(){
        $scope.currentImage=Math.max($scope.currentImage-1,0)
    }

    $scope.nextImage=function(){
        $scope.currentImage=Math.min($scope.currentImage+1,$scope.stuff.images && $scope.stuff.images.length-1 || 0);
    }
});