var request = require('request');
var Promise = require('es6-promise').Promise;

module.exports = function (params, method) {
    var BASEURL = 'https://localhost';
   //console.log(BASEURL + params);
    return new Promise(function (resolve, reject) {
        request({
            url: BASEURL + params
            , method: method
        }, function (error, response, body) {
            if (error) {
                reject(error);
            } else if (response.statusCode != 200) {
                var err = new Error('Received response code: ' + response.statusCode);
                reject(err);
            } else {
                resolve(body);
            }
        });
    });
};