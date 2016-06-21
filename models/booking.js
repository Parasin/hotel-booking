var Sequelize = require('sequelize');
var _ = require('underscore');

module.exports = function (sequelize, DataTypes) {
    var booking =  sequelize.define('booking', {
        "bookedBy": {
            "type": DataTypes.STRING
            , "allowNull": false
            , "unique": false
            , "validate": {
                "isEmail": true
            }
        }
        , "roomNumber": {
            "type": DataTypes.INTEGER
            , "allowNull": false
            , "validate": {
                "isNumeric": true
            }
        }
        , "bookedAt": {
            "type": DataTypes.NOW
            , "allowNull": false
            , "defaultValue": Sequelize.NOW
            , "validate": {
                "isDate": true
            }
        }
        , "startDate": {
            "type": DataTypes.DATE
            , "allowNull": false
            , "defaultValue": Sequelize.NOW
            , "validate": {
                "isDate": true
            }
        }
        , "endDate": {
            "type": DataTypes.DATE
            , "allowNull": false
            , "defaultValue": Sequelize.NOW
            , "validate": {
                "isDate": true
            }
        }
        , "availability": {
            "type": DataTypes.STRING
            , "allowNull": false
            , "defaultValue": 'Available'
            , "validate": {
                "isAlpha": true
            }
        }
        , "userId": {
            "type": DataTypes.INTEGER
            , "allowNull": false
            , "validate": {
                "isNumeric": true
            }
        }
    }, {
        "hooks": {
        }
        , "classMethods": {
            checkAvailability: function (body) {
                return new Promise(function (resolve, reject) {
                    try {
                        /* See if the room is booked in our time range */
                        booking.findAll({
                            "where": {
                                "roomNumber": body.roomNumber
                            }
                        }).then(function (bookings) {

                            if (!_.isEmpty(bookings)) {
                                var utcStartDate = Date.parse(body.startDate);
                                var utcEndDate = Date.parse(body.endDate);

                                if (utcEndDate < utcStartDate || utcStartDate > utcEndDate) {
                                    reject({error: 'Room unavailable for requested time'});  
                                }

                                for (var i = 0; i < bookings.length; i++) {
                                    var bookingStart = Date.parse(bookings[i].startDate);
                                    var bookingEnd = Date.parse(bookings[i].endDate);

                                    if (utcStartDate >= bookingStart && utcStartDate <= bookingEnd) {
                                        reject({error: 'Room unavailable for requested time'});  
                                    } else if (utcEndDate >= bookingEnd && utcEndDate <= bookingEnd) {
                                        reject({error: 'Room unavailable for requested time'});   
                                    } else {
                                        resolve();
                                    }
                                }

                            } else {
                                resolve();
                            }
                        }, function (err) {
                            reject(err);
                        })
                    } catch (err) {
                        reject(err);
                    }
                });
            }
        }
    });
    return booking;
};