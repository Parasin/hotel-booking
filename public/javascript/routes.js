var app = angular.module('bookingApp');
app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'home.html',
        controller: ''
    })
    .when('/profile', {
        templateUrl: 'PROFILE.html',
        controller: ''
    })
    .when('/booking', {
        templateUrl: 'BOOKING.html',
        controller: ''
    })
    .when('/login', {
        templateUrl: 'LOG IN.html',
        controller: 'loginController'
    })
    .when('/signup', {
        templateUrl: 'SIGN UP.html',
        controller: 'registerController'
    })
    .when('/aboutUs', {
        templateUrl: 'ABOUT US.html',
        controller: ''
    })
    .otherwise({redirectTo: '/'})
}])
