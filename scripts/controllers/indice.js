app.controller('marController', ['$scope', '$window', '$http', '$location', '$filter', function ($scope, $window, $http, $location, $filter ) {

  
    
    $http.get('scripts/services/objects.json').
    //$http.get('scripts/services/objects.json').
      then(function(response) {
        // when the response is available
        $scope.dados = response.data;
        //console.log($scope.dados);
        $scope.ca_objects = [];
        for (elem in $scope.dados) {
            $scope.ca_objects.push($scope.dados[elem]);
        }
        //ok
        return $scope.ca_objects;
      }, function(response) {
        // error.
        
      });
    
    //número de elementos no loop    
    
    
        
    //console.log($scope.showEvent.length);
      
    


}]);