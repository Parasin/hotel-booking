var bcrypt = require('bcryptjs');

module.exports = function (app, _, middleware, db, bodyParser) {
    /* Get individual booking */
    app.get('/bookings/user/:id', middleware.requireAuthentication, function (req, res) {
        var bookingId = parseInt(req.params.id, 10);

        db.booking.findByOne({
            "where": {
                id: bookingId
                , userId: req.user.get('id')
            }
        }).then(function (booking) {
            if (!_.isNull(booking)) {
                res.json(booking);
            } else {
                res.status(404).json({
                    "error": 'No booking found with that id.'
                });
            }

        }).catch(function (err) {
            res.status(500).json(err);
        });
    });

    /* GET all available bookings */
    app.get('/bookings', middleware.requireAuthentication, function (req, res) {
        var query = _.pick(req.query, 'endDate', 'startDate', 'availability', 'roomNumber', 'pricePerNight', 'roomType', 'numBed');
        var where = {};
        var rooms = {};

        if (query.hasOwnProperty('roomNumber')) {
            where.roomNumber = query.roomNumber;
        }
        if (query.hasOwnProperty('pricePerNight')) {
            where.pricePerNight = {
                $lte: query.pricePerNight
            };
        }
        if (query.hasOwnProperty('roomType')) {
            where.roomType = query.roomType;
        }
        if (query.hasOwnProperty('numBed')) {
            where.numBed = query.numBed;
        }
        where.inService = 1;

        db.room.findAll({
            where: where
        }).then(function (returnedRooms) {
            rooms = returnedRooms;
            db.booking.getAvailableRooms(query, rooms).then(function (availableRooms) {
                if (!_.has('error')) {
                    res.send(availableRooms);
                } else {
                    res.status(404).send(availableRooms);
                }
            }, function (err) {
                res.status(404).send(err);
            });
        }, function (err) {
            console.log(JSON.stringify(err));
        });
    });

    /* GET all user bookings */
    app.get('/bookings/user', middleware.requireAuthentication, function (req, res) {
        var query = _.pick(req.query, 'endDate', 'startDate', 'availability', 'roomNumber');
        var where = {};

        where.userId = req.user.get('id');

        if (query.hasOwnProperty('roomNumber')) {
            where.roomNumber = query.roomNumber;
        }
        if (query.hasOwnProperty('endDate')) {
            where.endDate = query.endDate;
        }
        if (query.hasOwnProperty('startDate')) {
            where.startDate = query.StartDate;
        }


        db.booking.findAll({
            "where": where
        }).then(function (bookings) {
            res.json(bookings);
        }).catch(function (err) {
            res.status(500).send(err);
        });
    });

    /* POST Create new booking */
    app.post('/bookings', middleware.requireAuthentication, function (req, res) {
        var body = _.pick(req.body, 'endDate', 'startDate', 'bookedAt', 'roomNumber', 'hotelId');
        body.bookedBy = req.user.email;
        body.userId = req.user.get('id');
        body.availability = 'Unavailable';

        var where = {};
        where.id = body.roomNumber;
        where.inService = 1;

        db.room.findOne({
            where: where
        }).then(function (room) {
            if (!_.isEmpty(room)) {
                /* See if the room is booked in our time range */
                db.booking.checkAvailability(body).then(function () {
                    db.booking.create(body).then(function (booking) {
                        booking = _.pick(booking, 'bookedAt', 'startDate', 'endDate', 'bookedBy', 'availability', 'roomNumber');
                        res.json(booking);
                    }, function (err) {
                        return res.status(400).json(err);
                    });
                }, function (err) {
                    res.status(400).json(err);
                });
            }
        }, function (err) {
            res.status(404).send({
                error: 'Room not available'
            });
        });


    });


    /* DELETE a booking */
    app.delete('/bookings/:id', middleware.requireAuthentication, function (req, res) {
        var bookingId = parseInt(req.params.id, 10);

        /* Find the ID to be Destroyed, destroy it */
        db.booking.destroy({
            "where": {
                "id": bookingId
                , "userId": req.user.get('id')
            }
        }).then(function (rowsDeleted) {
            if (rowsDeleted === 0) {
                res.status(404).json({
                    "error": "Booking not found"
                });
            } else {
                res.status(204).send();
            }
        }).catch(function (err) {
            res.status(500).json(err);
        });
    });

    /* PUT updates a specific booking*/
    app.put('/bookings/:id', middleware.requireAuthentication, function (req, res) {
        var body = _.pick(req.body, 'endDate', 'startDate', 'bookedAt', 'bookedBy', 'roomNumber');
        var attributes = {};
        var bookingId = parseInt(req.params.id, 10);

        if (body.hasOwnProperty('roomNumber')) {
            attributes.roomNumber = body.roomNumber;
        }
        if (body.hasOwnProperty('bookedBy')) {
            attributes.bookedBy = body.bookedBy;
        }

        if (body.hasOwnProperty('endDate')) {
            attributes.endDate = body.endDate;
        }
        if (body.hasOwnProperty('startDate')) {
            attributes.startDate = body.startDate;
        }

        db.booking.findOne({
            "where": {
                "id": bookingId
                , "userId": req.user.get('id')
            }
        }).then(function (booking) {
            if (!_.isNull(booking)) {
                booking.update(attributes).then(function (booking) {
                    res.json(booking.toJSON());
                }, function (e) {
                    res.status(400).json(e);
                });
            } else {
                res.status(404).send();
            }
        }, function (err) {
            res.status(500).json(err);
        });
    });


    /* POST users */
    app.post('/users', function (req, res) {
        var body = _.pick(req.body, 'email', 'password', 'firstName', 'lastName', 'dateOfBirth', 'vipStatus', 'frequentUser');

        db.user.create(body).then(function (user) {
            res.json(user.toPublicJSON());
        }).catch(function (err) {
            res.status(400).send(err);
        });
    });

    /* POST login users */
    app.post('/users/login', function (req, res) {
        var body = _.pick(req.body, 'email', 'password');
        var userInstance;
        db.user.authenticate(body).then(function (user) {
            var token = user.generateToken('authentication');
            userInstance = user;
            return db.token.create({
                token: token
            });

        }).then(function (tokenInstance) {
            res.header('Auth', tokenInstance.get('token')).json(userInstance.toPublicJSON());
        }).catch(function (err) {
            res.status(401).send(err);
        });
    });

    /* PUT users */
    /*app.put('/users', function (req, res) {
        var body = _.pick(req.body, 'email', 'password', 'firstName', 'lastName', 'dateOfBirth', 'vipStatus', 'frequentUser');

        db.user.update(body).then(function (user) {
            res.json(user.toPublicJSON());
        }).catch(function (err) {
            res.status(400).send(err);
        });
    });*/

    /* DELETE /users/login */
    app.delete('/users/login', middleware.requireAuthentication, function (req, res) {
        req.token.destroy().then(function () {
            res.status(204).send();
        }).catch(function (err) {
            res.status(500).send(err);
        });
    });

    /* POST create rooms */
    app.post('/rooms', middleware.requireAuthentication, function (req, res) {
        var body = _.pick(req.body, 'roomType', 'pricePerNight', 'inService', 'hotelId', 'view', 'numBath', 'numBed', 'kitchen');

        db.room.create(body).then(function (room) {
            res.send(body);
        }).catch(function (err) {
            res.status(400).send(err);
        });
    });

    /* POST create hotel */
    app.post('/hotel', middleware.requireAuthentication, function (req, res) {
        var body = _.pick(req.body, 'phoneNo', 'name', 'street', 'city', 'zipcode', 'country');

        db.hotel.create(body).then(function () {
            res.send(body);
        }).catch(function (err) {
            res.status(400).send(err);
        });
    });
};