var app = angular.module('app', ['ngMaterial', 'ngResource', 'ngRoute']);

    var options = {};
    options.api = {};
    options.api.base_url = "http://localhost:3000";

    app.config(function($routeProvider, $locationProvider, $httpProvider, $mdThemingProvider) {
        var checkLoggedin = function($q, $timeout, $http, $location, $rootScope){

            var deferred = $q.defer();

            $http.get('/loggedin').success(function(user){
                // Authenticated
                if (user !== '0')
                    deferred.resolve();
                // Not Authenticated
                else {
                    $rootScope.message = 'You need to log in.';
                    deferred.reject();
                    $location.url('/login');
                }
            });
            return deferred.promise;
        };
        $httpProvider.interceptors.push(function($q, $location) {
            return {
                response: function(response) {
                    return response;
                },
                responseError: function(response) {
                    if (response.status === 401)
                        $location.url('/login');
                    return $q.reject(response);
                }
            };
        });
        $routeProvider
            .when('/', {
                templateUrl: 'templates/dashboard.html',
                controller: 'DashboardController',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
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
                redirectTo: '/'
            });
        $mdThemingProvider.theme('default')
            .primaryPalette('green')
            .accentPalette('indigo');
    })

    .run(function($rootScope, $http){
        $rootScope.message = '';
        $rootScope.logout = function(){
            $rootScope.message = 'Logged out.';
            $http.post('/logout');
        };
    })

        .controller('MothershipController', function ($scope, $mdSidenav) {
            $scope.close = function () {
                $mdSidenav('left').close()
                    .then(function () {
                        $log.debug("close LEFT is done");
                    });
            };

            $scope.menu = [
                {
                    link : '/dashboard',
                    title: 'Dashboard',
                    icon: 'apps' // we have to use Google's naming convention for the IDs of the SVGs in the spritesheet
                },
                {
                    link : '/customers',
                    title: 'Kunden',
                    icon: 'tag_faces'
                },
                {
                    link : '/orders',
                    title: 'Bestellungen',
                    icon: 'archive'
                },
                {
                    link : '/payments',
                    title: 'Zahlungen',
                    icon: 'account_balance'
                }
            ];
            $scope.admin = [
                {
                    link : '/tracking',
                    title: 'Tracking',
                    icon: 'near_me'
                },
                {
                    link : '/couriers',
                    title: 'Kuriere',
                    icon: 'local_shipping'
                }
            ];

        })

    .controller('LoginController', function($scope, $rootScope, $http, $location) {
        // This object will be filled by the form
        $scope.user = {};

        // Register the login() function
        $scope.login = function(){
            console.log('Login attempt: ' + $scope.user.username);
            $http.post('/login', {
                username: $scope.user.username,
                password: $scope.user.password,
            })
                .success(function(user){
                    // No error: authentication OK
                    $rootScope.message = 'Authentication successful!';
                    $location.url('/admin');
                })
                .error(function(){
                    // Error: authentication failed
                    $rootScope.message = 'Authentication failed.';
                    $location.url('/login');
                });
        };
    })

    .controller('DashboardController', function($scope, $http) {
        // List of users got from the server
        $scope.users = [];

        $http.get('/users').success(function(users){
            for (var i in users)
                $scope.users.push(users[i]);
        });
    })

    .controller('AddCourierController', function ($scope, $http) {

    })

        .controller('ShowCouriersController', function ($scope, $http) {

        });