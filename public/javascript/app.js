var app = angular.module('bookingApp', ['ngRoute', 'ngResource', 'ngAnimate']);
app.factory('_', ['$window', function ($window) {
    return $window._;
}]);