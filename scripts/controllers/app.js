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


/*
app.factory("authenticationSvc", function ($http, $q, $window) {
    var userInfo;

    function login(userName, password) {
        var deferred = $q.defer();

        $http.post("/api/login", {
            userName: administrator,
            password: dublincore
        }).then(function (result) {
            userInfo = {
                accessToken: result.data.access_token,
                userName: result.data.userName
            };
            $window.sessionStorage["userInfo"] = JSON.stringify(userInfo);
            deferred.resolve(userInfo);
        }, function (error) {
            deferred.reject(error);
        });

        return deferred.promise;
    }

    return {
        login: login
    };
});
*/



//testController end  



app.config(function ($routeProvider, $locationProvider) {

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







//

//- pagina dupla/simples

//- botão de girar
//endereço muda quando seleciona

//- pagina de busca


//- foto original
//- html


//ca_collections
//http://www.codigorevista.org/dados/service.php/simple/revistas?q=*

//ca_objects
//http://www.codigorevista.org/dados/service.php/simple/objects?q=*&pretty=1
