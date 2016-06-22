app.controller('homeController', ['$scope', '$resource', '$location', 'authenticationService', function ($scope, $resource, $location, authenticationService) {
    
}]);

/* Login controller */
app.controller('loginController',
  ['$scope', '$location', 'authFactory',
  function ($scope, $location, authFactory) {
    $scope.login = function () {

      // initial values
      $scope.error = false;
      $scope.disabled = true;

      // call login from service
      authFactory.login($scope.loginForm.username, $scope.loginForm.password)
        // handle success
        .then(function () {
          $location.path('/home');
          $scope.disabled = false;
          $scope.loginForm = {};
        })
        // handle error
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Invalid username and/or password";
          $scope.disabled = false;
          $scope.loginForm = {};
        });
    };
}]);

/* Register controller */
app.controller('registerController',
  ['$scope', '$location', 'authFactory',
  function ($scope, $location, authFactory) {
    $scope.email;
    $scope.password;
    $scope.confirmPassword;
    $scope.dateOfBirth;
    $scope.firstName;
    $scope.lastName;
    $scope.register = function () {
        console.log('Resgitering');
      // initial values
      $scope.error = false;
      $scope.disabled = true;
       console.log($scope.email, $scope.password, $scope.dateOfBirth, $scope.firstName, $scope.lastName);
      // call register from service
      authFactory.register($scope.email, $scope.password, $scope.dateOfBirth, $scope.firstName, $scope.lastName)
        // handle success
        .then(function () {
          $location.path('/login');
          $scope.disabled = false;
          $scope.registerForm = {};
        })
        // handle error
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Something went wrong!";
          $scope.disabled = false;
          $scope.registerForm = {};
        });
    };
}]);

/* Logout controller */
app.controller('logoutController',
  ['$scope', '$location', 'authFactory',
  function ($scope, $location, authFactory) {

    $scope.logout = function () {

      // call logout from service
      authFactory.logout()
        .then(function () {
          $location.path('/login');
        });
    };
}]);