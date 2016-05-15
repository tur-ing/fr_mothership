appServices.factory('AuthenticationService', function () {
    var auth = {
        isAuthenticated: false,
        isAdmin: false
    }

    return auth;
});

appService.factory('UserService', function($http) {
    return {
        signIn: function(account, password) {
            return $http.post(options.api.base_url + '/user/signIn', { account: account, password: password });
        }
    }
})