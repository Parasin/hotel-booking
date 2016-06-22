app.service('authenticationService', ['$resource', '$http', '$cookieStore', '$rootScope', 'UserService', function ($resource, $http, $cookieStore, $rootScope, UserService) {
    var BASEURL = 'https://localhost/user';
    this.register = function () {
        var extension = $resource(BASEURL + "");

        return bookingApi.post({});
    }
    this.login = function (username, password, callback) {
        var extension = $resource(BASEURL + "");

        return bookingApi.get({});
    }
    this.setCredentials = function (username, password) {
        var authData = Base64.encode(username + ':' + password);
        $rootScope.globals = {
            currentUser: {
                username: username
                , authData: authData
            }
        };
        
        $http.defaults.headers.common['Auth'] = 'Basic ' + authData;
        $cookieStore.put('globals', $rootScope.globals);
    }
}]);