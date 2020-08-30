
app.controller("LivroController", ['$scope', '$http', '$location', '$routeParams', '$mdDialog', 'orderByFilter',
    function ($scope, $http, $location, $routeParams, $mdDialog, orderBy) {

       

        
        $scope.ListaLivros;
        $scope.ListaAutores;
        $scope.ListaAssuntos;
        $scope.Status;
        $scope.OrdemLista = 'Codigo';
        $scope.OrdemListaRev = false;
        $scope.Close = function () {
            $location.path('/');
        }

        $scope.OrdenaLivros = function (ordem) {
            $scope.OrdemLista = ordem;
            $scope.ListaLivros = orderBy($scope.ListaLivros, $scope.OrdemLista, $scope.OrdemListaRev);


        };
        // carregamento de listas externas
        
        $scope.CarregarTodos = function () {

            $http({
                method: 'GET',
                url: 'Livro/GetAll'
            }).then(function successCallback(response) {
                $scope.ListaLivros = response.data;
                $scope.OrdenaLivros($scope.OrdemLista);

            }, function errorCallback(response) {

                $scope.error = "Erro ao obter Livroes";
            })
        };
        $scope.CarregarTodosAutores = function () {

            $http({
                method: 'GET',
                url: 'Autor/GetAll'
            }).then(function successCallback(response) {
                $scope.ListaAutores = response.data;
                

            }, function errorCallback(response) {

                $scope.error = "Erro ao obter autores";
            })
        };
        $scope.CarregarTodosAssuntos = function () {

            $http({
                method: 'GET',
                url: 'Assunto/GetAll'
            }).then(function successCallback(response) {
                $scope.ListaAssuntos = response.data;


            }, function errorCallback(response) {

                $scope.error = "Erro ao obter Assuntoes";
            })
        };

        $scope.CarregarTodosAutores();
        $scope.CarregarTodosAssuntos();
        $scope.CarregarTodos();

  
        
        $scope.LimpaDados = function () {
            $scope.LivroData = {
                codL : 0 ,
                titulo : "", 
                editora : "",
                edicao : 0 , 
                anopublicao : 0,
                preco : 0,
                assuntos : [{codigo : 0 , Descricao : ""}]  ,
                autores  : [{ codigo: 0, Nome: "" }],
                autoresTXT: "",
                assuntosTXT: ""
                }
               
            };
            
        
        $scope.LimpaDados();

        //Get all employee and bind with html table
   

        $scope.CriaLivro = function () {
            $("#inputcodigo").val("");
            $("#inputnome").val("");
            $("#NovoLivro").modal('show');
            

            for (item in $scope.ListaAssuntos) {

                var opt = "".concat("<option value=", $scope.ListaAssuntos[item].Codigo, ">", $scope.ListaAssuntos[item].Descricao, "</option>");
                $('#selectassuntos').append(opt);
            };

            for (item in $scope.ListaAutores){

                var opt = "".concat("<option value=", $scope.ListaAutores[item].Codigo, ">", $scope.ListaAutores[item].Nome, "</option>");

                $('#selectaautores').append(opt);
            };
            $('#selectaautores').selectpicker();
            $('#selectassuntos').selectpicker();


            $scope.LimpaDados();
            };

        
        $scope.AlteraLivro = function (vcodigo, vnome) {

            $scope.LivroData.Codigo = vcodigo;
            $scope.LivroData.Nome = vnome;

            $("#inputcodigo").val(vcodigo);
            $("#inputnome").val(vnome);
            $("#AlteraLivro").modal('show');
        }
        $scope.CloseNovoLivro = function () {
            $("#NovoLivro").modal('hide');
        }
        $scope.CloseAlteraLivro = function () {
            $("#AlteraLivro").modal('hide');
        }



        $scope.DeleteLivro = function (codigo) {
            var LivroData = {
                Codigo: codigo
            };
            $scope.LivroData.Nome = $("#inputnome").val();
            $http({
                method: 'POST',
                url: 'Livro/Delete',
                data: LivroData,
                dataType: 'json',
                headers: { "Content-Type": "application/json" }
            }).then(function successCallback(response) {
                $scope.CloseNovoLivro();
                $scope.CarregarTodos();
                $scope.LimpaDados();


            }, function errorCallback(response) {

                $scope.error = "Erro ao obter Livroes";
            })
        }
        $scope.AdicionaNovoLivro = function () {


            $http({
                method: 'POST',
                url: 'Livro/Create',
                data: $scope.LivroData,
                dataType: 'json',
                headers: { "Content-Type": "application/json" }
            }).then(function successCallback(response) {
                $scope.CloseNovoLivro();
                $scope.CarregarTodos();
                $scope.LimpaDados();
               



            }, function errorCallback(response) {

                $scope.error = "Erro ao obter Livroes";
            })
        }
 
 
        $scope.AlteraDadosLivro = function () {
            $scope.LivroData.Codigo = $("#inputcodigo").val();
            $scope.LivroData.Nome = $("#inputnome").val();
            $http({
                method: 'POST',
                url: 'Livro/Update',
                data: $scope.LivroData,
                dataType: 'json',
                headers: { "Content-Type": "application/json" }
            }).then(function successCallback(response) {
                $scope.CloseAlteraLivro();
                $scope.CarregarTodos();
                $scope.LimpaDados();

                
            }, function errorCallback(response) {
                    alert(response.Data.Mensagem);
            })
        }

        $('#add-form').on('submit', function (e) {
            e.preventDefault();
            $scope.AdicionaNovoLivro();
        });

        $('#update-form').on('submit', function (e) {
            e.preventDefault();
            $scope.AlteraDadosLivro();
        });
        $("#telalivros").show();
    }

 ]);