var app = angular.module('app', [
    'ngRoute'

]);

function addLeadingZeros (n, length)
{
    var str = (n > 0 ? n : -n) + "";
    var zeros = "";
    for (var i = length - str.length; i > 0; i--)
        zeros += "0";
    zeros += str;
    return n >= 0 ? zeros : "-" + zeros;
}





//testController end  



app.config(function ($routeProvider, $locationProvider, $httpProvider) {

    //$locationProvider.html5Mode(true);
    $routeProvider
      .when('/revista', {
            templateUrl: 'parts/dupla.html',
            controller: 'pagController'
        }).
        when('/busca', {
            templateUrl: 'parts/busca.html',
            controller: 'buscaController'
        }).otherwise({templateUrl: 'parts/dupla.html',
            controller: 'pagController'});
    
    $httpProvider.defaults.useXDomain = true;
$httpProvider.defaults.withCredentials = true;
delete $httpProvider.defaults.headers.common["X-Requested-With"];
$httpProvider.defaults.headers.common["Accept"] = "application/json";
$httpProvider.defaults.headers.common["Content-Type"] = "application/json";
    
  });

/*app.config(['$routeProvider',
  function ($routeProvider) {
        $routeProvider.
        when('revista', {
            templateUrl: 'parts/dupla.html',
            controller: 'pagController'
        }).
        when('busca', {
            templateUrl: 'parts/busca.html',
            controller: 'pagController'
        }).
        otherwise({
            templateUrl: 'parts/busca.html',
            controller: 'pagController'
        });
  }]);
*/
app.filter('numberFixedLen', function () {
    return function (a, b) {
        return (1e4 + a + "").slice(-b)
    }
});

app.filter('numberStr', function () {
    return function (string) {
        parseInt(number);
    }
});

app.filter('rawHtml', ['$sce', function($sce){
  return function(val) {
    return $sce.trustAsHtml(val);
  };
}]);





//

//- redimensionamento das faixas
//- mudar zoom só do seu lado para cima e para baixo
//- sumir o menu


//- botão de girar
//endereço muda quando seleciona

//- pagina de busca


//- foto original
//- html


//ca_collections
//http://www.codigorevista.org/dados/service.php/simple/revistas?q=*

//ca_objects
//http://www.codigorevista.org/dados/service.php/simple/objects?q=*&pretty=1

//mysqldump -h banco.codigorevista.org -u codigoxyz -p --default-character-set=utf8 --result-file=backupcodigoutf8.sql codigorevista

//¬†

//http://www.webdeveasy.com/javascript-promises-and-angularjs-q-service/