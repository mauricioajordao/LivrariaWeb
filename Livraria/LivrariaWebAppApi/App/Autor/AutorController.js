app.controller("AutorController", ['$scope', '$http', '$location', '$routeParams', '$mdDialog', 'orderByFilter',
    function ($scope, $http, $location, $routeParams, $mdDialog, orderBy) {

        $scope.ListaAutores;
        $scope.Status;
        $scope.OrdemLista = 'Codigo';
        $scope.OrdemListaRev = false;
        $scope.Close = function () {
            $location.path('/');
        }
        $scope.LimpaDados = function () {
            $scope.autorData = {
                Codigo: 0,
                Nome: ""
            };
           
        };
        $scope.LimpaDados();

        //Get all employee and bind with html table
        $scope.CarregarTodos = function () {

            $http({
                method: 'GET',
                url: 'Autor/GetAll'
            }).then(function successCallback(response) {
                $scope.ListaAutores = response.data;
                $scope.OrdenaAutores($scope.OrdemLista);

            }, function errorCallback(response) {

                $scope.error = "Erro ao obter autores";
            })
        };
        $scope.CriaAutor = function () {
            $("#inputcodigo").val("");
            $("#inputnome").val("");
            $("#NovoAutor").modal('show');
            $scope.LimpaDados();
            

        }
        $scope.AlteraAutor = function (vcodigo, vnome) {

            $scope.autorData.Codigo = vcodigo;
            $scope.autorData.Nome = vnome;

            $("#inputcodigo").val(vcodigo);
            $("#inputnome").val(vnome);
            $("#AlteraAutor").modal('show');
        }
        $scope.CloseNovoAutor = function () {
            $("#NovoAutor").modal('hide');
        }
        $scope.CloseAlteraAutor = function () {
            $("#AlteraAutor").modal('hide');
        }


        $scope.CarregarTodos();

        $scope.DeleteAutor = function (codigo) {
            var autorData = {
                Codigo: codigo
            };
            $scope.autorData.Nome = $("#inputnome").val();
            $http({
                method: 'POST',
                url: 'Autor/Delete',
                data: autorData,
                dataType: 'json',
                headers: { "Content-Type": "application/json" }
            }).then(function successCallback(response) {
                $scope.CloseNovoAutor();
                $scope.CarregarTodos();
                $scope.LimpaDados();


            }, function errorCallback(response) {

                $scope.error = "Erro ao obter autores";
            })
        }
        $scope.AdicionaNovoAutor = function () {


            $http({
                method: 'POST',
                url: 'Autor/Create',
                data: $scope.autorData,
                dataType: 'json',
                headers: { "Content-Type": "application/json" }
            }).then(function successCallback(response) {
                $scope.CloseNovoAutor();
                $scope.CarregarTodos();
                $scope.LimpaDados();



            }, function errorCallback(response) {

                $scope.error = "Erro ao obter autores";
            })
        }
        $scope.OrdenaAutores = function (ordem) {
            $scope.OrdemLista = ordem;
            $scope.ListaAutores = orderBy($scope.ListaAutores, $scope.OrdemLista, $scope.OrdemListaRev);


        };
 
        $scope.AlteraDadosAutor = function () {
            $scope.autorData.Codigo = $("#inputcodigo").val();
            $scope.autorData.Nome = $("#inputnome").val();
            $http({
                method: 'POST',
                url: 'Autor/Update',
                data: $scope.autorData,
                dataType: 'json',
                headers: { "Content-Type": "application/json" }
            }).then(function successCallback(response) {
                $scope.CloseAlteraAutor();
                $scope.CarregarTodos();
                $scope.LimpaDados();

                
            }, function errorCallback(response) {
                    alert(response.Data.Mensagem);
            })
        }

        $('#add-form').on('submit', function (e) {
            e.preventDefault();
            $scope.AdicionaNovoAutor();
        });

        $('#update-form').on('submit', function (e) {
            e.preventDefault();
            $scope.AlteraDadosAutor();
        });

    }

 ]);