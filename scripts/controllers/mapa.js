app.controller('mapaController', ['$scope', '$window', '$http', '$location', '$filter', function ($scope, $window, $http, $location, $filter) {


    //carrega objetos    

    var autores = [];

    $scope.buscaobj = 'http://localhost/dados/service.php/simple/objects?q=*';
    $scope.buscarev = 'http://localhost/dados/service.php/simple/revistas?q=*';
    $scope.buscaaut = 'http://localhost/dados/service.php/simple/autores?q=*';

    //$scope.buscaobj = 'http://codigorevista.org/dados/service.php/simple/objects?q=*';
    //$scope.buscarev = 'http://codigorevista.org/dados/service.php/simple/revistas?q=*';
    //$scope.buscaaut = 'http://codigorevista.org/dados/service.php/simple/autores?q=*';

    $http({
        method: 'GET',
        url: $scope.buscaobj
    }).then(function successCallback(response) {
        //console.log(response.data);
        $scope.objetos = response.data;
        $scope.arrobj = $filter('array')($scope.objetos);
        $scope.arrobj = $filter('orderBy')($scope.arrobj, 'idno');
        $scope.edicao = $scope.arrobj;
        $scope.edicao2 = $scope.arrobj;
        $scope.sel = $scope.arrobj;
        $scope.sel2 = $scope.arrobj; 
        
        
        return $scope.arrobj;

    }, function errorCallback(response) {
        // or server returns response with an error status.
    });



    //carrega colecoes
    $http({
        method: 'GET',
        url: $scope.buscarev
    }).then(function successCallback(response) {
        //console.log(response.data);
        $scope.revistas = response.data;

    }, function errorCallback(response) {
        // or server returns response with an error status.
    });


    //carrega autores

    $http({
        method: 'GET',
        url: $scope.buscaaut
    }).then(function successCallback(response) {
        //console.log(response.data);
        $scope.autores = response.data;
        //console.log(autores);

    }, function errorCallback(response) {
        // or server returns response with an error status.
    });

    //variaveis padrão

    //revista par
    //revista impar  
    $scope.dir = "codigo01";
    $scope.dir2 = "codigo01";

    //pagina par
    //pagina impar
    $scope.indice = "codigo01_0001";
    $scope.indice2 = "codigo01_0038";

    //tipo par
    //tipo impar
    $scope.tipo = "imagem";
    $scope.tipo2 = "imagem";

    $scope.busca = "";
    $scope.busca2 = "";

    
    
    
    //estilo pagina par (zoom)
    //estilo pagina impar (zoom)
    //$scope.estilo = $('#faixa').css();
    //$scope.estilo = angular.element('#faixa').getBoundingClientRect();

    //$scope.estilo = 'bla'
    //$scope.estilo2 = $('#faixa2').css();

    //console.log($scope.estilo);

    //url

    var adress = '&indice=' + $scope.indice + '&indice2=' + $scope.indice2

    //$location.path(adress);    

    var query = $location.path();

    //observa mudanças no endereço



    if (query) {

        var items = query.split("&");
        //console.log(items);
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

        $scope.busca = params.busca;
        $scope.busca2 = params.busca2;
        $scope.indice = params.indice;
        $scope.indice2 = params.indice2;
        var parts = params.indice.split("_");
        var parts2 = params.indice2.split("_");
        $scope.dir = parts[0];
        $scope.dir2 = parts2[0];
    }







    $scope.udateindice = function () {
        $scope.indice = $scope.dir + "_0001";
        $scope.updateadress();
        $scope.edicao = $filter('filter')($scope.arrobj, {
                collections: $scope.dir
            });
    }
    $scope.udateindice2 = function () {
        $scope.indice2 = $scope.dir2 + "_0001";
        $scope.updateadress();
        $scope.edicao2 = $filter('filter')($scope.arrobj, {
                collections: $scope.dir2
            });

    }

    //array de objetos filtrados
    $scope.$watch('arrobj', function (newValue) {
        
        if (typeof newValue != 'undefined') {
            
            //objetos filtrados
            $scope.filtered = $scope.arrobj;


            //quando muda a busca
            $scope.$watch('busca', function (busca) {
                if (typeof busca != 'undefined') {
                    $scope.filtered = $filter('filter')($scope.arrobj, busca);
                } else {
                    $scope.filtered = $scope.arrobj;
                }
                
                //muda os selecionados
                $scope.sel = $scope.filtered;
                //$scope.pag = $filter('filter')($scope.sel, $scope.indice);

                var positem = findinarray($scope.sel, 'idno', $scope.indice);

                return positem;
                return $scope.sel;



                //            console.log(positem);
                //            console.log(nextitem);
                //            console.log(previtem);


            });

            $scope.$watch('busca2', function (busca2) {
                if (typeof busca2 != 'undefined') {
                    $scope.filtered2 = $filter('filter')($scope.arrobj, busca2);
                } else {
                    $scope.filtered2 = $scope.arrobj;
                }
                $scope.sel2 = $scope.filtered2;
                $scope.pag2 = $filter('filter')($scope.sel2, $scope.indice2);

                var positem2 = findinarray($scope.sel2, 'idno', $scope.indice2);

                if (positem2 >= $scope.sel2.length) {
                    var nextitem2 = 0;
                } else {
                    var nextitem2 = positem2 + 1;
                }

                if (positem2 <= 0) {
                    var previtem2 = $scope.sel2.length;
                } else {
                    var previtem2 = positem2 - 1;
                }

                return positem2;
                return $scope.sel2;


                //            console.log(positem2);
                //            console.log(nextitem2);
                //            console.log(previtem2);    
            });

            //console.log($scope.arrobj);


        }
    });








    $scope.moveprev = function () {

        var positem = findinarray($scope.edicao, 'idno', $scope.indice);
        var tamanho = $scope.edicao.length;
        if (positem <= 0) {
            var previtem = tamanho - 1;
        } else {
            var previtem = positem - 1;
        }
        $scope.indice = $scope.edicao[previtem].idno;
        var parts = $scope.indice.split("_");
        $scope.dir = parts[0];
        //console.log($scope.edicao);
        $scope.updateadress();


    }
    
        $scope.moveprev2 = function () {
        var positem = findinarray($scope.edicao2, 'idno', $scope.indice2);
        var tamanho = $scope.edicao2.length;
        if (positem <= 0) {
            var previtem = tamanho - 1;
        } else {
            var previtem = positem - 1;
        }
        $scope.indice2 = $scope.edicao2[previtem].idno;
        var parts = $scope.indice2.split("_");
        $scope.dir2 = parts[0];
        //console.log($scope.edicao);
        $scope.updateadress();


    }



    $scope.movenext = function () {
        var positem = findinarray($scope.edicao, 'idno', $scope.indice);
        var tamanho = $scope.edicao.length;

        if (positem >= tamanho - 1) {
            var nextitem = 0;
        } else {
            var nextitem = positem + 1;
        }
        $scope.indice = $scope.edicao[nextitem].idno;
        var parts = $scope.indice.split("_");
        $scope.dir = parts[0];
        //console.log($scope.edicao.length);

        $scope.updateadress();

    }


    $scope.movenext2 = function () {
        var positem = findinarray($scope.edicao2, 'idno', $scope.indice2);
        var tamanho = $scope.edicao2.length;

        if (positem >= tamanho - 1) {
            var nextitem = 0;
        } else {
            var nextitem = positem + 1;
        }
        $scope.indice2 = $scope.edicao2[nextitem].idno;
        var parts = $scope.indice2.split("_");
        $scope.dir2 = parts[0];
        //console.log($scope.edicao2);

        $scope.updateadress();

    }
    
    
    $scope.move = function() {
        var positem = findinarray($scope.sel, 'idno', $scope.indice);
        var tamanho = $scope.sel.length;
        var positem2 = findinarray($scope.sel, 'idno', $scope.indice2);
        
        fxnum = positem;
        fxnum2 = positem2;
        
        fxnum = Number(fxnum);
        fxnum2 = Number(fxnum2); 
        
        fxdif = fxnum - fxnum2;
        //confere se é impar
        
                if (fxnum % 2 === 1) {

            //se forem duplas
            if (fxdif == 1) {
                next = fxnum + 2;
                next2 = fxnum2 + 2;
                //se for a ultima dupla
                if (next == tamanho) {
                    next = 0;
                }
            }

            //se nao forem duplas
            else {
                next = fxnum;
                next2 = fxnum - 1;

                //se for a primeira pagina
                if (fxnum == 1) {
                    next2 = tamanho;
                    //se for capa/contracapa
                    if (fxnum2 == tamanho) {
                        next = fxnum + 2;
                        next2 = fxnum + 1;
                    }
                }
            }

            //se for par                
        }else {
            next = fxnum + 1;
            next2 = fxnum;
            
        }
        $scope.indice = $scope.sel[next].idno;

        $scope.indice2 = $scope.sel[next2].idno;
        
        $scope.updateadress();
        console.log(fxdif); 
         console.log(fxnum2);          

        console.log(fxnum);          

        //console.log(next);          
        //console.log(next2);
        console.log($scope.sel.length);
        
    
    }


    //    $scope.$watchGroup(['foo', 'bar'], function(newValues, oldValues, scope) {
    //  // newValues array contains the current values of the watch expressions
    //  // with the indexes matching those of the watchExpression array
    //  // i.e.
    //  // newValues[0] -> $scope.foo 
    //  // and 
    //  // newValues[1] -> $scope.bar 
    //});
    //    


    $scope.updateadress = function () {

        var newhash = "&busca2=" + $scope.busca2 + "&busca=" + $scope.busca + "&indice2=" + $scope.indice2 + "&indice=" + $scope.indice;
        $location.path(newhash)
            //console.log(newhash);

    }



//console.log($scope.edicao2);
    //end of controller
}]);









//pagina par
// move esquerda
// move proxima


//pagina impar
// move direita
// move proxima