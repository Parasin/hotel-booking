app.controller('homeController', ['$scope', '$resource', '$location', 'authenticationService', function ($scope, $resource, $location, authenticationService) {

}]);

/* Main controller */
app.controller('navController',
    ['$scope', '$location', 'authFactory', function($scope, $location, authFactory) {
       // $scope.logoutEnabled = authFactory.isLoggedIn();
         $scope.isActive = function (viewLocation) { 
            return viewLocation === $location.path();
        };
}]);

/* Login controller */
app.controller('loginController', ['$rootScope', '$scope', '$location', 'authFactory', '$cookies', '$route' , function ($rootScope, $scope, $location, authFactory, $cookies, $route) {
        $scope.error;
        $scope.errorMessage;

        $scope.login = function () {            
            // initial values
            $scope.error = false;

            // call login from service
            authFactory.login($scope.loginForm.email, $scope.loginForm.password)
            // handle success
            .then(function (userData) {
                $scope.error = false;
                $scope.errorMessage = '';
                $scope.loginForm = {};
                $rootScope.userData = userData;
                $location.path('/booking');
            }, function(err) {
                $scope.error = true;
                $scope.errorMessage = "Invalid username and/or password";
                console.log($scope.errorMessage);
            }).catch(function () {
                $scope.error = true;
                $scope.errorMessage = "Account does not exist.";
                $scope.loginForm = {};
            });
        };
}]);

/* Register controller */
app.controller('registerController', ['$scope', '$location', 'authFactory', '$timeout'
  , function ($scope, $location, authFactory, $timeout) {
        $scope.email;
        $scope.password;
        $scope.confirmPassword;
        $scope.dateOfBirth;
        $scope.firstName;
        $scope.lastName;
        $scope.processing;
        $scope.register = function () {
            $scope.processing = true;
            // initial values
            $scope.error = false;
            $scope.success = false;
            if ($scope.password !== $scope.confirmPassword) {
                $scope.error = true;
                $scope.errorMessage = 'Passwords must match';
                return;
            }
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
                    $scope.success = true;
                    $scope.processing = false;
                    $timeout(function () {
                        $location.path('/login');
                    }, 3000);
                }, function (err) {
                    $scope.error = true;
                    $scope.success = false;
                    $scope.processing = false;
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
                    $scope.processing = false;
                    $scope.errorMessage = JSON.stringify(err);
                });
        };
}]);

app.controller('profileController', ['$rootScope', '$scope',  function ($rootScope, $scope) {
    $scope.userData = $rootScope.userData;
    $scope.updatePass = function () {
        
    };
    
    //console.log($scope.userData);
}]);


app.controller('bookingController', ['$rootScope', '$scope', '$mdSidenav', function ($rootScope, $scope, $mdSidenav) {
    $scope.price = 500;
}]);

/* Logout controller */
app.controller('logoutController', ['$scope', '$location', 'authFactory', '$cookies'
  , function ($scope, $location, authFactory, $cookies) {
        $scope.logout = function () {
            if (!authFactory.isLoggedIn()) {
                return;
            }
            // call logout from service
            authFactory.logout()
                .then(function (data) {
                }, function (err) {
            });
        };
}]);