app.controller('homeController', ['$scope', '$resource', '$location', 'authenticationService', function ($scope, $resource, $location, authenticationService) {

}]);

/* Main controller */
app.controller('navController', ['$scope', '$location', 'authFactory', function ($scope, $location, authFactory) {
    // $scope.logoutEnabled = authFactory.isLoggedIn();
    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };
}]);

/* Login controller */
app.controller('loginController', ['$rootScope', '$scope', '$location', 'authFactory', '$cookies', '$route', '$timeout', function ($rootScope, $scope, $location, authFactory, $cookies, $route, $timeout) {
    $scope.error;
    $scope.errorMessage;
    $scope.processing = false;
    $scope.login = function () {
        // initial values
        $scope.error = false;
        $scope.processing = true;
        // call login from service
        authFactory.login($scope.loginForm.email, $scope.loginForm.password)
            // handle success
            .then(function (userData) {
                $scope.error = false;
                $scope.errorMessage = '';
                $scope.loginForm = {};
                $rootScope.userData = userData;
                $timeout(function () {
                    $scope.processing = false;
                    $location.path('/bookings');
                });
            }, function (err) {
                $scope.processing = false;
                $scope.error = true;
                $scope.errorMessage = "Invalid username and/or password";
                console.log($scope.errorMessage);
            }).catch(function () {
                $scope.processing = false;
                $scope.error = true;
                $scope.errorMessage = "Account does not exist.";
                $scope.loginForm = {};
            });
    };
}]);

/* Register controller */
app.controller('registerController', ['$scope', '$location', 'authFactory', '$timeout', function ($scope, $location, authFactory, $timeout) {
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
                email: $scope.email
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

app.controller('profileController', ['$rootScope', '$scope', 'authFactory', '$location', '$mdDialog', '$mdMedia', function ($rootScope, $scope, authFactory, $location, $mdDialog, $mdMedia) {
    $scope.userData = $rootScope.userData;
    $scope.newPass = '';
    $scope.newEmail = $scope.userData.email;
    $scope.updateEmail = false;
    $scope.updatePass = false;
    $scope.error = false;
    $scope.success = false;
    $scope.update = function () {
        var data = $scope.userData;
        var valid = false;
        if ($scope.updateEmail) {
            if($scope.newEmail.length > 4) {
                data.newEmail = $scope.newEmail;
                valid = true;
            }
            else {
                valid = false;
            }
        }
        else {
            data.newEmail = $scope.userData.email;
            valid = true;
        }
        if ($scope.updatePass) {
            if($scope.newPass.length >= 7) {
                data.newPass = $scope.newPass;
                valid = true;
            }
            else {
                valid = false;
            }
        }
        else {
            data.newPass = $scope.userData.password;
            valid = true;
        }
        if (valid) {
            authFactory.update(data).then(function (res) {
                console.log('Successfully updated account info: ' + JSON.stringify(res));
                $scope.success = true;
                $scope.error = false;
                $scope.updateEmail = false;
                $scope.updatePass = false;
                $rootScope.userData = res;
                $scope.userData = $rootScope.userData;
            }, function (err) {
                console.log('Error updating account info:  ' + err);
                $scope.success = false;
                $scope.error = true;
            });
        }  
    };
    $scope.confirmDelete = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
          .title('Confirm Account Deletion')
          .textContent('Are you sure that you want to delete your account? This is permanent!')
          .ariaLabel('Lucky day')
          .targetEvent(ev)
          .ok('Yes, delete my account')
          .cancel('No, I want to keep my account');

    $mdDialog.show(confirm).then(function() {
        authFactory.delete($rootScope.userData).then(function (data) {
            $scope.success = true;
            $scope.error = false;
            $rootScope.userData = null;
            $scope.userData = null;
            $location.path('/');
            console.log('Account deleted successfully!');
        });
    }, function() {
        
    });
  };
}]);


app.controller('bookingController', ['$resource', '$log', '$rootScope', '$scope', '$mdSidenav', '$q', '$http', '$location', '$cookies', function ($resource, $log, $rootScope, $scope, $mdSidenav, $q, $http, $location, $cookies) {
    $scope.price = 500;
    $scope.startDate;
    $scope.endDate;
    $scope.roomType;
    $scope.numBed;
    $scope.kitchen;
    $scope.view;
    var changed =  false;
    $scope.rooms = {
        array: []
    };
    var data = [];
    $scope.error;
    $scope.$watch('rooms.array', function () {console.log('Rooms retrieved!')});
    $scope.$on('$locationChangeStart', function(ev) {
        ev.preventDefault();
    });
    $scope.searchBookings = function () {
        if ($scope.kitchen === 'Yes') {
            $scope.kitchen = 1;
        }
        else if ($scope.kitchen === 'No') {
            $scope.kitchen = 0;
        }
        else {
            $scope.kitchen = null;
        }

        var roomType = $scope.roomType;
        var pricePerNight = $scope.price;
        var kitchen = $scope.kitchen;
        var view = $scope.view;
        var numBed = $scope.numBed;
        var defaults;
        $location.search({
            roomType: roomType
            , pricePerNight: pricePerNight
            , kitchen: kitchen
            , view: view
            , numBed: numBed
        });

        defaults = {
            roomType: ['Single Suite', 'Double Suite', 'Economy Suite', 'Presidential Suite', 'Honeymoon Suite']
            , pricePerNight: 5000
            , kitchen: [0, 1]
            , view: ['Courtyard', 'Skyline', 'Beachfront']
            , numBed: [1, 2, 3]
        };
        var query = $location.search()
        console.log(JSON.stringify(query));
        var Rooms =  $resource('/bookings/?', query, {
            save: {
                method: 'POST'
                , isArray: true
                , headers: {
                    Auth: $cookies.get('Auth')
                }
            }
        });

        Rooms.save().$promise.then(function (result) {
            $scope.error = null;
            $log.info('Num rooms: ' + data.length);
            $scope.rooms.array = [];
            for (var i = 0; i < result.length; i++) {
                $scope.rooms.array.push(result[i]);
            }
            $log.debug('ROOMS ARR: ' + JSON.stringify($scope.rooms.array));
        }, function (err) {
            $scope.error = err.data.error;
        });  
    };
}]);

/* Logout controller */
app.controller('logoutController', ['$scope', '$location', 'authFactory', '$cookies', function ($scope, $location, authFactory, $cookies) {
    $scope.logout = function () {
        if (!authFactory.isLoggedIn()) {
            return;
        }
        // call logout from service
        authFactory.logout()
            .then(function (data) {}, function (err) {});
    };
}]);