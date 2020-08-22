app.controller("AutorController", ['$scope', '$http', '$location', '$routeParams', '$mdDialog', 'orderByFilter',
    function ($scope, $http, $location, $routeParams, $mdDialog, orderBy) {
    $scope.ListOfEmployee;
    $scope.Status;
    $scope.OrdemLista = 'Codigo';
    $scope.OrdemListaRev = false;





    $scope.Close = function () {
        $location.path('/');
    }

    //Get all employee and bind with html table
    
    $scope.CarregarTodos = function () {

        $http({
            method: 'GET',
            url: 'Autor/GetAll'
        }).then(function successCallback(response) {
            $scope.ListOfEmployee = response.data;
            $scope.OrdenaAutores($scope.OrdemLista);
 
        }, function errorCallback(response) {

            $scope.error = "Erro ao obter autores";
        })
    };

    $scope.CriaAutor = function () {
        $("#NovoAutor").modal('show');
        
    }
    $scope.AlteraAutor = function (vcodigo, vnome) {
        var autorData = {
            Codigo: vcodigo,
            Nome:   vnome
        };

        $("#AlteraAutor").modal('show');
    }


    $scope.CloseNovoAutor = function () {
        $("#NovoAutor").modal('hide');
    }
    $scope.CloseAlteraAutor = function () {
        $("#AlteraAutor").modal('hide');
    }

      
     $scope.CarregarTodos();
    
    
    $scope.AdicionaNovoAutor = function () {
        var autorData = {
            Nome: $scope.Nome
        };

        $http({
            method: 'POST',
            url: 'Autor/Create',
            data: autorData,
            dataType: 'json',
            headers: { "Content-Type": "application/json" }
        }).then(function successCallback(response) {
            $scope.Mensagem(response.Mensagem);
            $scope.CloseNovoAutor();
            $scope.CarregarTodos();
            $scope.Nome = "";


        }, function errorCallback(response) {

            $scope.error = "Erro ao obter autores";
        })
    }

    $scope.OrdenaAutores = function (ordem) {
        $scope.OrdemLista = ordem;
        $scope.ListOfEmployee = orderBy($scope.ListOfEmployee, $scope.OrdemLista, $scope.OrdemListaRev);
      

    };

    $scope.Mensagem = function (msg) {
        $mdDialog.show(
            $mdDialog.alert()
                .parent(angular.element(document.querySelector('#DialogMensagem')))
                .clickOutsideToClose(true)
                .title('Mensagem')
                .textContent(msg)
                .ariaLabel('Mensagem')
                .ok('OK')
               
        );
    };

    $scope.AlteraDadosAutor = function () {
        var autorData = {
            Codigo: $scope.codigo,
            Nome: $scope.Nome
        };

        $http({
            method: 'POST',
            url: 'Autor/Update',
            data: autorData,
            dataType: 'json',
            headers: { "Content-Type": "application/json" }
        }).then(function successCallback(response) {
            $scope.CloseAlteraAutor();
            $scope.CarregarTodos();
            $scope.$parent.$location.reload();
        }, function errorCallback(response) {

            $scope.error = "Erro ao obter autores";
        })
    }

    $('#add-form').on('submit', function (e) {
        e.preventDefault();
        $scope.AdicionaNovoAutor();
    });

    $('#update-form').on('submit', function (e) {
        e.preventDefault();
        $scope.AdicionaNovoAutor();
    });



    //Fill the employee records for update

    if ($routeParams.empId) {
        $scope.Id = $routeParams.empId;

        $http.get('api/employee/GetEmployee/' + $scope.Id).success(function (data) {
            $scope.Codigo = data.Codigo;
            $scope.Nome = data.Nome;

  
            //$scope.DepartmentID = data.DepartmentID
        });

    }

    //Update the employee records
    $scope.Update = function () {
        debugger;
        var employeeData = {
            EmployeeID: $scope.Id,
            FirstName: $scope.FirstName,
            LastName: $scope.LastName,
            Address: $scope.Address,
            Salary: $scope.Salary,
            DOB: $scope.DOB
            //DepartmentID: $scope.DepartmentID
        };
        if ($scope.Id > 0) {

            $http.put("api/employee/UpdateEmployee", employeeData).success(function (data) {
                $location.path('/EmployeeList');
            }).error(function (data) {
                console.log(data);
                $scope.error = "Something wrong when adding updating employee " + data.ExceptionMessage;
            });
        }
    }


    //Delete the selected employee from the list
    $scope.Delete = function () {
        if ($scope.Id > 0) {

            $http.delete("api/employee/DeleteEmployee/" + $scope.Id).success(function (data) {
                $location.path('/EmployeeList');
            }).error(function (data) {
                console.log(data);
                $scope.error = "Something wrong when adding Deleting employee " + data.ExceptionMessage;
            });
        }

    }
}]);