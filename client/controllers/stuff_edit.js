inventoryApp.controller('StuffEditCtrl', function StuffEditCtrl($scope,$routeParams) {
    console.log($routeParams);
    $scope.stuffId=$routeParams.stuffId;
})