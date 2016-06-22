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

    factory.login = function (username, password) {
        // create a new instance of deferred
        var deferred = $q.defer();
        var data = {
            username: username
            , password: password
        };
        // send a post request to the server
        $http.post('/users/login', data)
            // handle success
            .success(function (data, status) {
                if (status === 200 && data.status) {
                    user = true;
                    deferred.resolve();
                } else {
                    user = false;
                    deferred.reject();
                }
            })
            // handle error
            .error(function (data) {
                user = false;
                deferred.reject();
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
                deferred.resolve();
            })
            // handle error
            .error(function (data) {
                user = false;
                deferred.reject();
            });

        // return promise object
        return deferred.promise;

    };

    factory.register = function (email, password, dateOfBirth, firstName, lastName) {
        // create a new instance of deferred
        var deferred = $q.defer();

        // send a post request to the server
        $http.post('/users', {
                email: email
                , password: password
                , dateOfBirth: dateOfBirth
                , firstName: firstName
                , lastName: lastName
            })
            // handle success
            .success(function (data, status) {
                if (status === 200 && data.status) {
                    deferred.resolve();
                } else {
                    deferred.reject();
                }
            })
            // handle error
            .error(function (data) {
                deferred.reject();
            });

        // return promise object
        return deferred.promise;
    }

    return factory;
}]);