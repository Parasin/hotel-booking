var app = angular.module('bookingApp');
app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'home.html',
        controller: ''
        , access: {
            restricted: false
        }
    })
    .when('/profile', {
        templateUrl: 'PROFILE.html',
        controller: ''
        , access: {
            restricted: false
        }
    })
    .when('/booking', {
        templateUrl: 'BOOKING.html',
        controller: ''
        , access: {
            restricted: true
        }
    })
    .when('/login', {
        templateUrl: 'LOG IN.html',
        controller: 'loginController'
        , access: {
            restricted: false
        }
    })
    .when('/logout', {
        templateUrl: 'home.html',
        controller: 'logoutController'
        , access: {
            restricted: true
        }
    })
    .when('/signup', {
        templateUrl: 'SIGN UP.html',
        controller: 'registerController'
        , access: {
            restricted: false
        }
    })
    .when('/aboutUs', {
        templateUrl: 'ABOUT US.html',
        controller: ''
        , access: {
            restricted: false
        }
    })
    .otherwise({redirectTo: '/'})
}])
