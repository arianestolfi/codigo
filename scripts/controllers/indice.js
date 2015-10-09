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
        $http.get('scripts/services/objects.json').
        then(function(response) {
        // when the response is available
        $scope.dados = response.data;
        //console.log($scope.dados);
        
        //ok
        return $scope.dados;
      }, function(response) {
        // error.
        
      });
      });
    //número de elementos no loop    
    
    
        
    //console.log($scope.showEvent.length);
      
    
    $scope.extensao = ".png";

    //$scope.indice = $scope.revista + "_" + selstrpar;

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


            numpag = 1;
        if (params.indice) {
            $scope.indice = params.indice;
            var parts = params.indice.split("_");
            $scope.revista = parts[0];
            var numpag = Number(parts[1]);
            
        }

   
       
            
        $scope.qualitem = Number(numpag);    
    }
    
    
    //fim da checagem da url
    
    
//moveimpar    
    $scope.moveimparnext = function () {

        if ($scope.pagimpar < $scope.numpagimpar) {
            $scope.pagimpar = $scope.pagimpar + 1
        } else {
            $scope.pagimpar = 1;
        }
        var strimpar = addLeadingZeros($scope.pagimpar, 4);
        $scope.indice2 = $scope.revista2 + "_" + strimpar;
        
        var adress = '&indice=' + $scope.indice + '&indice2=' + $scope.indice2;
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
        var adress = '&indice=' + $scope.indice + '&indice2=' + $scope.indice2;
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
        
        var adress = '&indice=' + $scope.indice + '&indice2=' + $scope.indice2;
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
        var adress =  '&indice=' + $scope.indice + '&indice2=' + $scope.indice2;
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

        var adress = '&indice=' + $scope.indice + '&indice2=' + $scope.indice2;
        $location.path(adress);

        //console.log($scope.revista + " " + fx2num + " " + pagnum);

    }

    //move para a esquerda

    

        //move para a esquerda

        
    
    
    
    
    
    
    

    //apoio
    

    $scope.RotateImage = function (id, deg) {
        var deg = 45 * deg;
        $('#' + id).css({
            '-webkit-transform': 'rotate(' + deg + 'deg)',
            '-moz-transform': 'rotate(' + deg + 'deg)',
            '-ms-transform': 'rotate(' + deg + 'deg)',
            '-o-transform': 'rotate(' + deg + 'deg)',
            'transform': 'rotate(' + deg + 'deg)'
                

        });
    }


    $scope.getNumber = function (num) {
        return new Array(num);
    }

    

    
    






}]);