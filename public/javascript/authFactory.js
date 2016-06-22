var app = angular.module('bookingApp');

app.factory('authFactory', ['$q', '$timeout', '$http', function ($q, $timeout, $http) {
    var user = null;
    var factory = {};

    factory.isLoggedIn = function () {
        if (user) {
            return true;
        } else {
            return false;
        }
    };

    factory.getUserStatus = function () {
        return user;
    };

    factory.login = function (email, password) {
        // create a new instance of deferred
        var deferred = $q.defer();
        var data = {
            email: email
            , password: password
        };
        // send a post request to the server
        $http.post('/users/login', data)
            // handle success
            .success(function (data, status) {
                if (status === 200) {
                    user = true;
                    deferred.resolve(data);
                } else {
                    user = false;
                    deferred.reject(data);
                }
            })
            // handle error
            .error(function (data) {
                user = false;
                deferred.reject(data);
            });

        // return promise object
        return deferred.promise;
    };

    factory.logout = function () {

        // create a new instance of deferred
        var deferred = $q.defer();

        // send a get request to the server
        $http.delete('/users/login')
            // handle success
            .success(function (data) {
                user = false;
                deferred.resolve(data);
            })
            // handle error
            .error(function (data) {
                user = false;
                deferred.reject(data);
            });

        // return promise object
        return deferred.promise;

    };

    factory.register = function (data) {
        // create a new instance of deferred
        var deferred = $q.defer();

        // send a post request to the server
        $http.post('/users', data)
            // handle success
            .success(function (data, status) {
                if (status === 200) {
                    deferred.resolve(data);
                } else {
                    deferred.reject(data);
                }
            })
            // handle error
            .error(function (data) {
                deferred.reject(data);
            });

        // return promise object
        return deferred.promise;
    }

    return factory;
}]);