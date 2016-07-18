var app = angular.module('bookingApp');

app.run(function ($rootScope, $location, $route, authFactory) {
  $rootScope.$on('$routeChangeStart', function (event, next, current) {
    if (next.access.restricted && authFactory.isLoggedIn() === false) {
      $location.path('/login');
      $route.reload();
    } else if (next.templateUrl === 'LOG IN.html' && authFactory.isLoggedIn() === true) {
        $location.path('/bookings');
        $route.reload();
    }
  });
});