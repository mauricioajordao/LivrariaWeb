app.controller("AssuntoController", ['$scope', '$http', '$location', '$routeParams', '$mdDialog', 'orderByFilter',
    function ($scope, $http, $location, $routeParams, $mdDialog, orderBy) {

        $scope.ListaAssuntoes;
        $scope.Status;
        $scope.OrdemLista = 'Codigo';
        $scope.OrdemListaRev = false;
        $scope.Close = function () {
            $location.path('/');
        }
        $scope.LimpaDados = function () {
            $scope.AssuntoData = {
                Codigo: 0,
                Descricao: ""
            };
            $scope.apply();
        };
        //Get all employee and bind with html table
        $scope.CarregarTodos = function () {

            $http({
                method: 'GET',
                url: 'Assunto/GetAll'
            }).then(function successCallback(response) {
                $scope.ListaAssuntoes = response.data;
                $scope.OrdenaAssuntoes($scope.OrdemLista);
                $scope.LimpaDados();

            }, function errorCallback(response) {

                $scope.error = "Erro ao obter Assuntoes";
            })
        };
        $scope.CriaAssunto = function () {
            $("#inputcodigo").val("");
            $("#inputDescricao").val("");
            $("#NovoAssunto").modal('show');
            $scope.LimpaDados();

        }
        $scope.AlteraAssunto = function (vcodigo, vDescricao) {

            $scope.AssuntoData.Codigo = vcodigo;
            $scope.AssuntoData.Descricao = vDescricao;

            $("#inputcodigo").val(vcodigo);
            $("#inputDescricao").val(vDescricao);
            $("#AlteraAssunto").modal('show');
        }
        $scope.CloseNovoAssunto = function () {
            $("#NovoAssunto").modal('hide');
        }
        $scope.CloseAlteraAssunto = function () {
            $("#AlteraAssunto").modal('hide');
        }


        $scope.CarregarTodos();

        $scope.DeleteAssunto = function (codigo) {
            var AssuntoData = {
                Codigo: codigo
            };

            $http({
                method: 'POST',
                url: 'Assunto/Delete',
                data: AssuntoData,
                dataType: 'json',
                headers: { "Content-Type": "application/json" }
            }).then(function successCallback(response) {
  
                $scope.CloseNovoAssunto();
                $scope.CarregarTodos();
                $scope.LimpaDados();


            }, function errorCallback(response) {

                $scope.error = "Erro ao obter Assuntoes";
            })
        }
        $scope.AdicionaNovoAssunto = function () {
            $scope.AssuntoData.Descricao = $("#inputDescricao").val();

            $http({
                method: 'POST',
                url: 'Assunto/Create',
                data: $scope.AssuntoData,
                dataType: 'json',
                headers: { "Content-Type": "application/json" }
            }).then(function successCallback(response) {

                $scope.CloseNovoAssunto();
                $scope.CarregarTodos();
                $scope.LimpaDados();


            }, function errorCallback(response) {

                $scope.error = "Erro ao obter Assuntoes";
            })
        }
        $scope.OrdenaAssuntoes = function (ordem) {
            $scope.OrdemLista = ordem;
            $scope.ListaAssuntoes = orderBy($scope.ListaAssuntoes, $scope.OrdemLista, $scope.OrdemListaRev);


        };
 
        $scope.AlteraDadosAssunto = function () {
            $scope.AssuntoData.Codigo = $("#inputcodigo").val();
            $scope.AssuntoData.Descricao = $("#inputDescricao").val();
            $http({
                method: 'POST',
                url: 'Assunto/Update',
                data: $scope.AssuntoData,
                dataType: 'json',
                headers: { "Content-Type": "application/json" }
            }).then(function successCallback(response) {
                $scope.CloseAlteraAssunto();
                $scope.CarregarTodos();
                $scope.LimpaDados();
                
            }, function errorCallback(response) {
                    alert(response.Data.Mensagem);
            })
        }

        $('#add-form').on('submit', function (e) {
            e.preventDefault();
            $scope.AdicionaNovoAssunto();
        });

        $('#update-form').on('submit', function (e) {
            e.preventDefault();
            $scope.AlteraDadosAssunto();
        });

    }

 ]);