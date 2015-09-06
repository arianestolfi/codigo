var app = angular.module('app', [
    'ngRoute'

]);


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


app.controller('pagController', ['$scope', '$window', '$http', function ($scope, $window, $http) {



    $scope.pagdirpar = 'codigo01';
    $scope.pagselectpar = 1;
    $scope.numpagpar = 32;

    $scope.pagdirimpar = 'codigo01';
    $scope.pagselectimpar = 1;
    $scope.numpagimpar = 32;

    $scope.tipoimg = "tratadas";
    $scope.versao = "foto";
    $scope.extensao = ".png";

    //move para próxima impar
    $scope.moveimparnext = function (qual) {


        if ($scope.pagselectimpar < $scope.numpagimpar) {
            $scope.nextimpar = Number($scope.pagselectimpar) + 1;
        } else {
            $scope.nextimpar = 1;
        }
        $scope.pagselectimpar = $scope.nextimpar;
        return $scope.nextimpar;
    }

    //move para a anterior impar
    $scope.moveimparprev = function () {

        if ($scope.pagselectimpar > 1) {
            $scope.previmpar = Number($scope.pagselectimpar) - 1;
        } else {
            $scope.previmpar = $scope.numpagimpar;
        }
        $scope.pagselectimpar = $scope.previmpar;
        return $scope.previmpar;
    }


    $scope.moveparprev = function () {

        if ($scope.pagselectpar > 1) {
            $scope.prevpar = Number($scope.pagselectpar) - 1;
        } else {
            $scope.prevpar = $scope.numpagpar;
        }
        $scope.pagselectpar = $scope.prevpar;
        return $scope.prevpar;
    }

$scope.moveparnext = function () {


        if ($scope.pagselectpar < $scope.numpagpar) {
            $scope.nextpar = Number($scope.pagselectpar) + 1;
        } else {
            $scope.nextpar = 1;
        }
        $scope.pagselectpar = $scope.nextpar;
        return $scope.nextmpar;
    }


//move para a direita

$scope.movedir = function () {
    //pega os numeros das páginas
    
    fx1num = $scope.pagselectpar;
    fx2num = $scope.pagselectimpar;
    pagnum = $scope.numpagimpar;
    fxdif = fx2num - fx1num;
    // transfere a pasta da direita para a esquerda
    $scope.pagdirpar = $scope.pagdirimpar;    
    
    //confere se é impar
    if (fx2num % 2 === 1) {
            
            //se forem duplas
            if (fxdif == 1) {
                next1 = fx1num + 2;
                next2 = fx2num + 2; 
                controle = pagnum + 1;
                //se for a ultima dupla
                
                if (next2 == controle) {
                    next2 = 1;
                }
            }
            
        
            //se nao forem duplas
            else {
                next2 = fx2num;
                next1 = fx2num - 1;
                
                //se for a primeira pagina
                if (fx2num == 1) {
                next1 = pagnum;
                    //se for capa/contracapa
                    if (fx1num == pagnum) {
                        next1 = fx2num + 1;
                        next2 = fx2num + 2;
                        }
                }
        } 
        
        //se for par                
        } else {
            next1 = fx2num;
            if (fx2num == pagnum) {
            next1 = pagnum;
            next2 = 1    
            }
            else {
            next2 = fx2num + 1;
            }
        }

    $scope.pagselectimpar = next2;
    $scope.pagselectpar = next1;
}

//move para a esquerda

$scope.moveesq = function () {

        fx1num = $scope.pagselectpar;
	    fx2num = $scope.pagselectimpar;
	    fxdif = fx2num - fx1num;
	    //fxdif = parseFloat(fxdif);
        $scope.pagdirimpar = $scope.pagdirpar;
	     pagnum = $scope.pagnumpar;
	    
        //se for par
        if (fx1num % 2 === 0) {
            //se forem duplas
            if (fxdif == 1) {
                next1 = fx1num - 2;
                next2 = fx2num - 2; 
                //se for a primeira dupla
                if (fx1num == 2) {
                    next1 = pagnum;
                    next2 = 1;
                }
            }
            
        
            //se nao forem duplas
            else {
                next1 = fx1num;
                next2 = fx1num + 1;
                
                //se for a ultima pagina
                if (fx1num == pagnum) {
                next2 = 1;
                    //se for capa/contracapa
                    if (fx2num == 1) {
                        next1 = fx1num - 2;
                        next2 = fx1num -1;
                        }
                }
        } 
        
        //se for impar                
        
        } else {
            next2 = fx1num;
            if (fx1num == 1) {
            next1 = pagnum;
            }
                
            else {
            next1 = fx1num - 1;
            
            }

        }
     
        $scope.pagselectimpar = next2;
        $scope.pagselectpar = next1;


}

    //apoio
    $scope.apoiocl = 'estreito';
    $scope.items = [];


    $scope.movefrente = function ($scope) {}

    $scope.RotateImage = function (id, deg) {
        var deg = 90 * deg;
        $('#' + id).css({
            '-webkit-transform': 'rotate(' + deg + 'deg)',
            '-moz-transform': 'rotate(' + deg + 'deg)',
            '-ms-transform': 'rotate(' + deg + 'deg)',
            '-o-transform': 'rotate(' + deg + 'deg)',
            'transform': 'rotate(' + deg + 'deg)'
                //data-ng-click="RotateImage('img'+ $index,rd);rd=rd+1;rd==4?rd=0:''"

        });
    }


    $scope.getNumber = function (num) {
        return new Array(num);
    }

    /*$http.get('http://localhost/providence/service.php/simple/testSearch?q=*').
      then(function(response) {
        // when the response is available
        $scope.items = response.data;
        console.log(response.data);
        //ok
      }, function(response) {
        // error.
      });*/

    //checa proporção da página
    $scope.altura = $window.innerHeight;
    $scope.largura = $window.innerWidth;
    $scope.proporcao = $scope.largura / $scope.altura;
    if ($scope.proporcao > 1.5) {
        $scope.dupla = true;
    } else {
        $scope.dupla = false;
    };
    // resize diminuir 
    $(window).resize(function () {
        $scope.altura = $window.innerHeight;
        $scope.largura = $window.innerWidth;
        $scope.proporcao = $scope.largura / $scope.altura;
        if ($scope.proporcao > 1.5) {
            $scope.dupla = true;
        } else {
            $scope.dupla = false;
        };
        $scope.$apply()
    });
                            //$http.get('http://localhost/~ASA/providence/service.php/service.php/simple/objects?q=*')

    $http.get('http://localhost/~ASA/codigo/scripts/services/items2.json').
        then(function (response) {
        // when the response is available

        $scope.items = response.data;
        $scope.ca_objects = [];
        for (elem in $scope.items) {
            $scope.ca_objects.push($scope.items[elem]);
        }
        $scope.numpagpar = $scope.ca_objects.length;
        console.log($scope.ca_objects);

        /*if ($routeParams.itemId > 0) {
          $scope.prevItem = Number($routeParams.itemId)-1;
        } else {
          $scope.prevItem = $scope.artists.length-1;
        }

        if ($routeParams.itemId < $scope.artists.length-1) {
          $scope.nextItem = Number($routeParams.itemId)+1;
        } else {
          $scope.nextItem = 0;
        }   */


        //ok
    }, function (response) {
        // error.
    });







}]);
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
            controller: 'pagController'
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
// - quase
//- endereco variaviel
//http://stackoverflow.com/questions/14301524/in-angular-how-to-redirect-with-location-path-as-http-post-success-callback
// $location.hash().split('=')[1]

//- mover para direita e esquerda
//- mover para o topo e baixo
//- conectar com banco de dados
//- pagina de busca
//- foto original
//- html

//direita não funciona no firefox