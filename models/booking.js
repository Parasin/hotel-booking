var Sequelize = require('sequelize');
var _ = require('underscore');

module.exports = function (sequelize, DataTypes) {
    var booking = sequelize.define('booking', {
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
            , "defaultValue": DataTypes.NOW
            , "validate": {
                "isDate": true
            }
        }
        , "startDate": {
            "type": DataTypes.DATE
            , "allowNull": false
            , "defaultValue": DataTypes.NOW
            , "validate": {
                "isDate": true
            }
        }
        , "endDate": {
            "type": DataTypes.DATE
            , "allowNull": false
            , "defaultValue": DataTypes.NOW
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
        "hooks": {}
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
                                    reject({
                                        error: 'Time range is not valid'
                                    });
                                }

                                for (var i = 0; i < bookings.length; i++) {
                                    var bookingStart = Date.parse(bookings[i].startDate);
                                    var bookingEnd = Date.parse(bookings[i].endDate);

                                    if ((utcStartDate >= bookingStart && utcStartDate <= bookingEnd) || (utcEndDate >= bookingStart && utcEndDate <= bookingEnd)) {
                                        reject({
                                            error: 'Room unavailable for requested time'
                                        });
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
            , getAvailableRooms: function (query, rooms) {
                return new Promise(function (resolve, reject) {
                    try {
                        var where = {};
                        if (query.hasOwnProperty('roomNumber')) {
                            where.roomNumber = query.roomNumber;
                        }
                        if (query.hasOwnProperty('endDate')) {
                            where.endDate = Date.parse(query.endDate);
                        }
                        if (query.hasOwnProperty('startDate')) {
                            where.startDate = Date.parse(query.startDate);
                        }
                        if (query.hasOwnProperty('availability')) {
                            where.availability = query.availability;
                        } else {
                            where.availability = 'Unavailable';
                        }

                        booking.findAll({
                            "where": where
                        }).then(function (bookings) {
                            var desiredStartDate = Date.parse(query.startDate.toString());
                            var desiredEndDate = Date.parse(query.endDate.toString());

                            for (var i = 0; i < bookings.length; i++) {
                                var bookingStart = Date.parse(bookings[i].startDate);
                                var bookingEnd = Date.parse(bookings[i].endDate);

                                // If the range we are booking overlaps with a booking remove from rooms
                                if ((desiredStartDate >= bookingStart && desiredStartDate <= bookingEnd) || (desiredEndDate >= bookingStart && desiredEndDate <= bookingEnd)) {
                                    rooms = _.reject(rooms, function (room) {
                                        return room.roomNumber === bookings[i].roomNumber;
                                    });
                                }
                            }
                            for (var i = 0; i < rooms.length; i++) {
                                rooms[i] = _.pick(rooms[i], 'roomNumber', 'roomType', 'pricePerNight');
                            }
                            
                            if (!_.isEmpty(rooms)) {
                                resolve(rooms);
                            } else {
                                reject({error: 'No rooms available'});
                            }
                        });
                    } catch (err) {
                        reject(err);
                    }
                });
            }
        }
    });
    return booking;
};