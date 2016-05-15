var app = angular.module('mothership', ['ngMaterial', 'ngRoute']);

    var options = {};
    options.api = {};
    options.api.base_url = "http://localhost:3000";

    app.config(['$routeProvider', '$mdThemingProvider', function($routeProvider, $mdThemingProvider) {
        $routeProvider
            .when('/addCourier', {
                templateUrl: 'templates/add-courier.html',
                controller: 'AddCourierController'
            })
            .when('/showCouriers', {
                templateUrl: 'templates/show-couriers.html',
                controller: 'ShowCouriersController'
            })
            .when('/login', {
                templateUrl: 'templates/login.html',
                controller: 'LoginController'
            })
            .otherwise({
                redirectTo: '/addCourier'
            });
        $mdThemingProvider.theme('default')
            .primaryPalette('green')
            .accentPalette('indigo');
    }])

    .factory('AuthenticationService', function() {
        var auth = {
            isAuthenticated: false,
            isAdmin: false
        }
        return auth;
    })

    .factory('UserService', function($http) {
        return {
            signIn: function(account, password) {
                return $http.post(options.api.base_url + '/user/signIn', {
                    account: account,
                    password: password
                });
            }
        }
    })

    .controller('mothershipController', function($scope) {

    })

    .controller('AddCourierController', function($scope) {

    })

    .controller('ShowCouriersController', function($scope) {

    })

    .controller('LoginController', ['$scope', '$location', '$window', 'UserService', 'AuthenticationService',
        function($scope, $location, $window, UserService, AuthenticationService) {

            $scope.logIn = function logIn(account, password) {
                if (account !== undefined && password !== undefined) {
                    UserService.logIn(account, password).success(function(data) {
                        AuthenticationService.isLogged = true;
                        $window.sessionStorage.token = data.token;
                        $location.path('/dashboard');
                    }).error(function(status, data) {
                        console.log(status);
                        console.log(data);
                    });
                }
            }
        }
    ]);