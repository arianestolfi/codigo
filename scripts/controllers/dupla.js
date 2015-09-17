app.controller('pagController', ['$scope', '$window', '$http', '$location', function ($scope, $window, $http, $location) {

    
/*    $http.get('http://api:codigo@localhost/dados/service.php/simple/objects?q=*&pretty=1').
      then(function(response) {
        // when the response is available
        $scope.dados = response.data;
        console.log($scope.dados);
        $scope.ca_objects = [];
        for (elem in $scope.dados) {
            $scope.ca_objects.push($scope.dados[elem]);
        }
        //ok
      }, function(response) {
        // error.
      });*/
    

    
    
    $http.get('http://administrator:dublincore@codigorevista.org/dados/service.php/simple/objects?q=*').
      then(function(response) {
        // when the response is available
        $scope.dados = response.data;
        console.log($scope.dados);
        $scope.ca_objects = [];
        for (elem in $scope.dados) {
            $scope.ca_objects.push($scope.dados[elem]);
        }
        //ok
      }, function(response) {
        // error.
      });
    //número de elementos no loop    
    $scope.numpagpar = 40;
    $scope.numpagimpar = 40;

    var selstrpar = addLeadingZeros($scope.numpagpar, 4);
    var selstrimpar = 0001;

    //valores padrão
    $scope.revista = "codigo01";
    $scope.revista2 = "codigo01";
    
    $scope.tipoimg = "tratadas";
    $scope.versao = "foto";
    $scope.extensao = ".png";

    $scope.indice = $scope.revista + "_" + selstrpar;
    $scope.indice2 = $scope.revista2 + "_" + selstrimpar;

    // pega elementos da url


    var queryString = $location.path();


    //se url tem alguma coisa
    if (queryString) {
        var items = queryString.split("&");
        var params = {};

        for (var i = 0, l = items.length; i < l; i++) {
            var temp = items[i].split("=");
            if (temp[0]) {
                if (temp.length < 2) {
                    temp.push("");
                }
                params[decodeURIComponent(temp[0])] = decodeURIComponent(temp[1]);
            }
        }
        //console.log(params);


        //se tem revista
        if (params.revista) {
            $scope.revista = params.revista;
        }

        //se tem revista 2
        if (params.revista2) {
            $scope.revista2 = params.revista2;
        } else {
            if (params.revista) {
                $scope.revista2 = params.revista;
            }
            $scope.revista2 = $scope.revista2;
        }


        if (params.indice) {
            $scope.indice = params.indice;
        }

        if (params.indice2) {
            $scope.indice2 = params.indice2;
        } else {
            if (params.indice) {
                var numpag = params.indice.split("_").pop(); // => "Tabs1
                numpag = Number(numpag);
                if (numpag % 2 === 1) {
                    //$scope.pagimpar = numpag;
                    $scope.indice2 = params.indice;
                    if (numpag > 1) {
                        var strpar = numpag - 1;
                        var strpar = addLeadingZeros(strpar, 4);
                        $scope.indice = $scope.revista2 + "_" + strpar;
                    } else {
                        //se for a primeira
                        var strpar = addLeadingZeros($scope.numpagimpar, 4);
                        $scope.indice = $scope.revista2 + "_" + strpar;
                    }
                } else {
                    //se for par
                    $scope.indice = params.indice;
                    //se for a última
                    if (numpag == $scope.numpagpar) {
                        $scope.indice2 = 1;
                    } else {
                        var strimpar =  numpag + 1;
                        var strimpar = addLeadingZeros(strimpar, 4);
                        $scope.indice2 = $scope.revista2 + "_" + strimpar;
                    }
                }
            }
        }
    }
    
//fim da checagem da url

//converte indices para numeros    
$scope.pagimpar = $scope.indice2.split("_").pop();
$scope.pagpar = $scope.indice.split("_").pop();
$scope.pagimpar = Number($scope.pagimpar);
$scope.pagpar = Number($scope.pagpar);    
    

console.log($scope.pagpar + "+" + $scope.pagimpar);
    
    //move para a próxima impar

    $scope.moveimparnext = function () {

        if ($scope.pagimpar < $scope.numpagimpar) {
            $scope.pagimpar = $scope.pagimpar + 1
        } else {
            $scope.pagimpar = 1;
        }
        var strimpar = addLeadingZeros($scope.pagimpar, 4);
        $scope.indice2 = $scope.revista2 + "_" + strimpar;
        
        var adress = '&revista=' + $scope.revista + '&indice=' + $scope.indice + '&revista2=' + $scope.revista2 + '&indice2=' + $scope.indice2;
          $location.path(adress) ;
        
    }
    
        $scope.moveimparprev = function () {

        if ($scope.pagimpar > 1) {
            $scope.pagimpar = Number($scope.pagimpar) - 1;
        } else {
            $scope.pagimpar = $scope.numpagimpar;
        }
        var strimpar = addLeadingZeros($scope.pagimpar, 4);
        $scope.indice2 = $scope.revista2 + "_" + strimpar;
        var adress = '&revista=' + $scope.revista + '&indice=' + $scope.indice + '&revista2=' + $scope.revista2 + '&indice2=' + $scope.indice2;
        $location.path(adress) ;
        
    }

//move para a próxima par 
    $scope.moveparnext = function () {

        if ($scope.pagpar < $scope.numpagpar) {
            $scope.pagpar = $scope.pagpar + 1
        } else {
            $scope.pagpar = 1;
        }
        var strpar = addLeadingZeros($scope.pagpar, 4);
        $scope.indice = $scope.revista + "_" + strpar;
        
        var adress = '&revista=' + $scope.revista + '&indice=' + $scope.indice + '&revista2=' + $scope.revista2 + '&indice2=' + $scope.indice2;
          $location.path(adress) ;
        
    }

    //move para a anterior impar 
    
    $scope.moveparprev = function () {

        if ($scope.pagpar > 1) {
            $scope.pagpar = Number($scope.pagpar) - 1;
        } else {
            $scope.pagpar = $scope.numpagpar;
        }
        var strpar = addLeadingZeros($scope.pagpar, 4);
        $scope.indice = $scope.revista + "_" + strpar;
        var adress = '&revista=' + $scope.revista + '&indice=' + $scope.indice + '&revista2=' + $scope.revista2 + '&indice2=' + $scope.indice2;
        $location.path(adress) ;
    }
    
    


    //move para a direita

    $scope.movedir = function () {
        //pega os numeros das páginas

        fx1num = $scope.pagpar;
        fx2num = $scope.pagimpar;
        fx1num = Number(fx1num);
        fx2num = Number(fx2num);
        pagnum = $scope.numpagimpar;
        fxdif = fx2num - fx1num;
        // transfere a pasta da direita para a esquerda
        $scope.revista = $scope.revista2;

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
            } else {
                next2 = fx2num + 1;
            }
        }

        //move para a direita

        $scope.pagimpar = next2;
        $scope.pagpar = next1;
        var strnext2 = addLeadingZeros(next2, 4);
        var strnext1 = addLeadingZeros(next1, 4);

        $scope.indice2 = $scope.revista2 + "_" + strnext2;
        $scope.indice = $scope.revista2 + "_" + strnext1;

        var adress = '&revista=' + $scope.revista + '&indice=' + $scope.indice + '&revista2=' + $scope.revista2 + '&indice2=' + $scope.indice2;
        $location.path(adress);

        //console.log($scope.revista + " " + fx2num + " " + pagnum);

    }

    //move para a esquerda

    $scope.moveesq = function () {

        fx1num = $scope.pagpar;
        fx2num = $scope.pagimpar;
        fx1num = Number(fx1num);
        fx2num = Number(fx2num);
        fxdif = fx2num - fx1num;
        //fxdif = parseFloat(fxdif);
        $scope.revista2 = $scope.revista;
        pagnum = $scope.numpagpar;

        //console.log(fx1num + " " + fx2num + " " + pagnum);


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
                    next2 = pagnum - 1;

                    //se for capa/contracapa
                    if (fx2num == 1) {
                        next1 = fx1num - 2;
                        next2 = fx1num - 1;
                    } else {
                        next1 = 1;
                    }
                }
            }

            //se for impar                

        } else {
            next2 = fx1num;
            if (fx1num == 1) {
                next1 = pagnum;
            } else {
                next1 = fx1num - 1;

            }

        }

        //move para a esquerda

        $scope.pagimpar = next2;
        $scope.pagpar = next1;

        var strprev2 = addLeadingZeros(next2, 4);
        var strprev1 = addLeadingZeros(next1, 4);

        $scope.indice2 = $scope.revista + "_" + strprev2;
        $scope.indice = $scope.revista + "_" + strprev1;

        var adress = '&revista=' + $scope.revista + '&indice=' + $scope.indice + '&revista2=' + $scope.revista2 + '&indice2=' + $scope.indice2 ;
console.log($scope.revista + " " + fx2num + " " + pagnum);

        $location.path(adress);


    }
    
    
    
    $scope.updateadress = function() {
        
        var strimpar = addLeadingZeros($scope.pagimpar, 4);
        var strpar = addLeadingZeros($scope.pagpar, 4);

        $scope.indice2 = $scope.revista + "_" + strimpar;
        $scope.indice = $scope.revista + "_" + strpar;
        
        var adress = '&revista=' + $scope.revista + '&indice=' + $scope.indice + '&revista2=' + $scope.revista2 + '&indice2=' + $scope.indice2 ;
       $location.path(adress);
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

/*
    $http.get('scripts/services/objects.json').
    then(function (response) {
        // when the response is available

        $scope.items = response.data;
        $scope.ca_objects = [];
        for (elem in $scope.items) {
            $scope.ca_objects.push($scope.items[elem]);
        }
        //$scope.numpagpar = $scope.ca_objects.length;
        //console.log($scope.ca_objects);

//        if ($routeParams.itemId > 0) {
//          $scope.prevItem = Number($routeParams.itemId)-1;
//        } else {
//          $scope.prevItem = $scope.artists.length-1;
//        }
//
//        if ($routeParams.itemId < $scope.artists.length-1) {
//          $scope.nextItem = Number($routeParams.itemId)+1;
//        } else {
//          $scope.nextItem = 0;
//        }   


        //ok
    }, function (response) {
        // error.
    });
*/







}]);