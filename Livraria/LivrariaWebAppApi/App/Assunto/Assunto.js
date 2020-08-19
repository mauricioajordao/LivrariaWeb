var app = angular.module('Assunto', ['ngRoute']);

app.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {

    $routeProvider.when('/EmployeeList', { //Routing for show list of employee
        templateUrl: '/Assunto/Views/EmployeeList.html',
        controller: 'AssuntoController'
    }).when('/AddEmployee', { //Routing for add employee
        templateUrl: '/App/Views/AddEmployee.html',
        controller: 'EmployeeController'
    })
        .when('/EditEmployee/:empId', { //Routing for geting single employee details
            templateUrl: '/App/Views/EditEmployee.html',
            controller: 'EmployeeController'
        })
        .when('/DeleteEmployee/:empId', { //Routing for delete employee
            templateUrl: '/App/Views/DeleteEmployee.html',
            controller: 'EmployeeController'
        })
        .otherwise({ //Default Routing
            controller: 'EmployeeController'
        })
}]);