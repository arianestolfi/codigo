var app = angular.module('app', [
    'ngRoute',
    'ngTouch'

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
      .
    when('/mapa', {
            templateUrl: 'parts/mapa.html',
            controller: 'mapaController'
        }).
        when('/busca', {
            templateUrl: 'parts/busca.html',
            controller: 'buscaController'
        }).otherwise({
        
        templateUrl: 'parts/mapa.html',
            controller: 'mapaController'
    });
    
            //$locationProvider.html5Mode(true);

    
$httpProvider.defaults.useXDomain = true;
$httpProvider.defaults.withCredentials = true;
delete $httpProvider.defaults.headers.common["X-Requested-With"];
$httpProvider.defaults.headers.common["Accept"] = "application/json";
$httpProvider.defaults.headers.common["Content-Type"] = "application/json";
    
  });

app.directive('ngMain', function() {
  return {

    templateUrl: 'parts/menu.html'
    }
  
});

app.directive('ngMain2', function() {
  return {
    templateUrl: 'parts/menu2.html'
  }
});

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



app.filter('array', function() {
  return function(items) {
    var filtered = [];
    angular.forEach(items, function(item) {
      filtered.push(item);
    });
   return filtered;
  };
});


function findinarray(arraytosearch, key, valuetosearch) {

    for (var i = 0; i < arraytosearch.length; i++) {

    if (arraytosearch[i][key] == valuetosearch) {
    return i;
    }
    }
    return null;
    }

//mudar zoom só do seu lado para cima e para baixo

//html
//tutorial (help)
//indice não arrasta no ipad



//ipad swipe 
//foto original
//tipo na url
//zoom na url


//ca_collections
//http://www.codigorevista.org/dados/service.php/simple/revistas?q=*

//ca_entites
//http://codigorevista.org/dados/service.php/simple/autores?q=*

//ca_objects
//http://www.codigorevista.org/dados/service.php/simple/objects?q=*&pretty=1

//mysqldump -h banco.codigorevista.org -u codigoxyz -p --default-character-set=utf8 --result-file=backupcodigoutf8.sql codigorevista

//¬†

//http://www.webdeveasy.com/javascript-promises-and-angularjs-q-service/