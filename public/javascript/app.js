var app = angular.module('bookingApp', ['ngRoute', 'ngResource', 'ngAnimate', 'ngCookies']);
app.factory('_', ['$window', function ($window) {
    return $window._;
}]);