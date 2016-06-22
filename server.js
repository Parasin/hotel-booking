var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var db = require('./db.js');
var bcrypt = require('bcryptjs');
var path = require('path');
var middleware = require('./middleware.js')(db);
var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.sendFile('index.html', {root: __dirname});
});

app.use(bodyParser.json());

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

/* GET all available bookings 
TODO: Need to update to show all rooms that are not booked. */
app.get('/bookings', middleware.requireAuthentication, function (req, res) {
    var query = _.pick(req.query, 'endDate', 'startDate', 'availability', 'roomNumber');
    var where = {};

    if (query.hasOwnProperty('roomNumber')) {
        where.roomNumber = query.roomNumber;
    }
    if (query.hasOwnProperty('endDate')) {
        where.endDate = query.endDate;
    }
    if (query.hasOwnProperty('startDate')) {
        where.startDate = query.StartDate;
    }
    if (query.hasOwnProperty('availability')) {
        where.availability = query.availability;
    } else {
        where.availability = 'Available';
    }


    db.booking.findAll({
        "where": where
    }).then(function (bookings) {
        res.json(bookings);
    }).catch(function (err) {
        res.status(500).send(err);
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
    var body = _.pick(req.body, 'endDate', 'startDate', 'bookedAt', 'roomNumber');
    body.bookedBy = req.user.email;
    body.userId = req.user.get('id');
    body.availability = 'Unavailable';

    /* See if the room is booked in our time range */
    db.booking.checkAvailability(body).then(function (bookings) {
        db.booking.create(body).then(function (booking) {
            booking = _.pick(booking, 'bookedAt', 'startDate', 'endDate', 'bookedBy', 'availability', 'roomNumber');
            res.json(booking);
        }, function (err) {
            return res.status(400).json(err);
        });        
    }, function (err) {
        res.status(404).json(err);
    })
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

    if (query.hasOwnProperty('roomNumber')) {
        attributes.roomNumber = body.roomNumber;
    }
    if (query.hasOwnProperty('bookedBy')) {
        attributes.bookedBy = body.bookedBy;
    }

    if (query.hasOwnProperty('endDate')) {
        attributes.endDate = body.endDate;
    }
    if (query.hasOwnProperty('startDate')) {
        attributes.startDate = body.StartDate;
    }

    db.booking.findByOne({
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
    var body = _.pick(req.body, 'email', 'password', 'firstName', 'lastName', 'dateOfBirth');

    db.user.create(body).then(function (user) {
        res.json(user.toPublicJSON());
    }).catch(function (err) {
        res.status(400).json(err);
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
        res.status(401).send();
    });
});


/* DELETE /users/login */
app.delete('/users/login', middleware.requireAuthentication, function (req, res) {
    req.token.destroy().then(function () {
        res.status(204).send();
    }).catch(function () {
        res.status(500).send();
    });
});

// Sync the database
db.sequelize.sync( /*{force: true}*/ ).then(function () {
    app.listen(PORT, function () {
        console.log('Express listening on port ' + PORT);
    });
});