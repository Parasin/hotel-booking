app.service('authenticationService', ['$resource', function($resource) {
    var BASEURL = 'https://localhost/user';
    this.register = function(matchId) {
        var extension = $resource(BASEURL + "");
    
        return bookingApi.post({ }); 
    }
    this.login = function(steamId) {
        var extension = $resource(BASEURL + "");
        
        return bookingApi.get({ });
    }
}]);