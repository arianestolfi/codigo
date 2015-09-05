var app = angular.module('app', [
    
]);



app.controller('pagController', ['$scope', '$http', function($scope, $http){
 // always pass empty object
    
    $http.get('scripts/services/items.json').
  then(function(response) {
    // this callback will be called asynchronously
    // when the response is available
    //alert('yes');
    $scope.items = response.data.rows;
    //console.log(response.data.rows);
    //console.log = paginas;
 
  }, function(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    alert('no');
  });

$http.get('scripts/services/paginas.json').
  then(function(response) {
    // this callback will be called asynchronously
    // when the response is available
    //alert('yes');
    $scope.paginas = response;
    console.log(response.data.revistas);
  }, function(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    alert('no');
  });
    
    $scope.teste = 'aloalo';
    $scope.pagdirpar = 'codigo01';
    $scope.pagselectpar = 1;
    $scope.pagdirimpar = 'codigo01';
    $scope.pagselectimpar = 1;

    
    $scope.numpags = 52;
    $scope.getNumber = function(num) {
    return new Array(num);   
}

    $scope.movedir = function(pagpar, pagimpar) {
    
    
    }
    

    
}]);



app.filter('numberFixedLen', function () {
    return function(a,b){
        return(1e4+a+"").slice(-b)
    }
});

var paginas = [

    {
        name: 'codigo01',
        pagnum: 36,
        description: "código 01",
        numero: 1,
     },
    {
        name: 'codigo08',
        pagnum: 36,
        description: "código 07",
        numero: 1,
     }

    ];
    
   