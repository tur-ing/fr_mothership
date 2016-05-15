angular.module('app.controllers', [])

    .controller('mothershipController', function($scope) {

    })

    .controller('AddCourierController', function($scope) {

    })

    .controller('ShowCouriersController', function($scope) {

    })

    .controller('LoginController', ['$scope', '$location', '$window', 'UserService', 'AuthenticationService',
        function ($scope, $location, $window, UserService, AuthenticationService) {

    $scope.logIn = function logIn(account, password) {
        if(account !== undefined && password !== undefined) {
            UserService.logIn(account, password).success(function(data) {
                AuthenticationService.isLogged = true;
                $window.sessionStorage.token = data.token;
                $location.path('/dashboard');
            }).error(function (status, data) {
                console.log(status);
                console.log(data);
            });
        }
    }
  }]);