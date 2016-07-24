var app = angular.module('bookingApp', ['ngRoute', 'ngResource', 'ngAnimate', 'ngCookies', 'ngMaterial', 'ngDialog', 'ngMessages']);
app.factory('_', ['$window', function ($window) {
    return $window._;
}]);