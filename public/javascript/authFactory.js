var app = angular.module('bookingApp');

app.factory('authFactory', ['$q', '$timeout', '$http', '$cookies', function ($q, $timeout, $http, $cookies) {
    var user = false;
    var factory = {};
    var userData = {};
    
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
            .success(function (data, status, headers) {
                if (status === 200) {
                    user = true;
                    if ($cookies.get('Auth')) {
                       $cookies.remove('Auth');
                    }
                    if ($cookies.get('email')) {
                        $cookies.remove('email');
                    }
                    $cookies.put('Auth', headers('Auth'));
                    $cookies.put('email', data.email);
                    //console.log(data);
                    userData = data;
                    deferred.resolve(data);
                } else {
                    user = false;
                    userData = {};
                    console.log(data); 
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
        
        var config = {
            headers: {
                'Content-type': 'application/json'
                , 'Auth': $cookies.get('Auth')
            }
        };
        
        // send a get request to the server
        $http.delete('/users/login', config)
            // handle success
            .success(function (data, status, headers) {
                $cookies.remove('Auth');
                $cookies.remove('email');
                user = false;
                userData = {};
                deferred.resolve(data);
            })
            // handle error
            .error(function (data, status, headers) {
                //console.log('Data: ' + data + ' Status: ' + status + ' Headers: ' + JSON.stringify(headers));
                user = false;
                userData = {};
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
                if (status === 200 || status === 204) {
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