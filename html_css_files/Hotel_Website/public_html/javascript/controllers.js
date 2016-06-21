app.controller('homeController', ['$scope', '$resource', '$location', 'authenticationService', function ($scope, $resource, $location, authenticationService) {
    
}]);

app.controller('loginController', ['$scope', '$resource', '$location', 'authenticationService', function ($scope, $resource, $location, authenticationService) {
    $scope.credentials;
    $scope.username;
    $scope.password;
    $scope.confirmPassword;
    $scope.dateOfBirth;
    $scope.firstName;
    $scope.lastName;
}]);