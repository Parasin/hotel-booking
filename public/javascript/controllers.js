app.controller('homeController', ['$scope', '$resource', '$location', 'authenticationService', function ($scope, $resource, $location, authenticationService) {

}]);

/* Main controller */
app.controller('navController',
    ['$scope', '$location', function($scope, $location) {
         $scope.isActive = function (viewLocation) { 
            return viewLocation === $location.path();
        };
}]);

/* Login controller */
app.controller('loginController', ['$scope', '$location', 'authFactory', '$cookies'
  , function ($scope, $location, authFactory, $cookies) {
        $scope.error;
        $scope.errorMessage;
        $scope.login = function () {
            //console.log('\n\nLogin with cookie: ' + $cookies.get('Auth') + '\n\n')
            if ($cookies.get('Auth')) {
                $location.path('#/');
            }
            // initial values
            $scope.error = false;

            // call login from service
            $scope.$watch('errorMessage', function() {
                authFactory.login($scope.loginForm.email, $scope.loginForm.password)
                // handle success
                .then(function () {
                    $scope.error = false;
                    $scope.errorMessage = '';
                    $scope.loginForm = {};
                    $location.path('#/');
                }, function(err) {
                    $scope.error = true;
                    $scope.errorMessage = "Invalid username and/or password";
                    console.log($scope.errorMessage);
                }).catch(function () {
                    $scope.error = true;
                    $scope.errorMessage = "Account does not exist with that email.";
                    $scope.loginForm = {};
                });
            }, true);
        };
}]);

/* Register controller */
app.controller('registerController', ['$scope', '$location', 'authFactory'
  , function ($scope, $location, authFactory) {
        $scope.email;
        $scope.password = '';
        $scope.confirmPassword = '';
        $scope.dateOfBirth;
        $scope.firstName;
        $scope.lastName;
      
        $scope.register = function () {
            // initial values
            $scope.error = false;
            $scope.success = false;

            // call register from service
            var data = {
                email:$scope.email
                , password: $scope.password
                , dateOfBirth: $scope.dateOfBirth
                , firstName: $scope.firstName
                , lastName: $scope.lastName
            };
            authFactory.register(data)
                // handle success
                .then(function (data) {
                    $scope.email = '';
                    $scope.password = '';
                    $scope.confirmPassword = '';
                    $scope.dateOfBirth = '';
                    $scope.firstName = '';
                    $scope.lastName = '';
                    $scope.success = true;
                }, function (err) {
                    $scope.error = true;
                    $scope.success = false;
                    //console.log(JSON.stringify(err));
                    if (err.errors[0].message == 'Validation len failed' && err.errors[0].path == 'password') {
                        $scope.errorMessage = 'Password must be at least 7 characters!';
                    } else if (err.errors[0].message == 'email must be unique') {
                        $scope.errorMessage = 'An account already exists with that email!';
                    } else if (err.errors[0].message == 'Validation isAlpha failed') {
                        $scope.errorMessage = 'First and Last names must not include numbers or special characters!';
                    }
                    //console.log($scope.errorMessage);
                }).catch(function (err) {
                    console.log('Big Error: ' + err);
                    $scope.error = true;
                    $scope.success = false;
                    $scope.errorMessage = JSON.stringify(err);
                });
        };
}]);

/* Logout controller */
app.controller('logoutController', ['$scope', '$location', 'authFactory'
  , function ($scope, $location, authFactory) {

        $scope.logout = function () {

            // call logout from service
            authFactory.logout()
                .then(function (data) {
                }, function (err) {
            });
        };
}]);