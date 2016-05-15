var app = angular.module( 'mothership', [ 'ngMaterial', 'ngRoute', 'mothership.controllers', 'appServices' ] );

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
}]);
