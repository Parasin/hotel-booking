var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var db = require('./db.js');
var bcrypt = require('bcryptjs');
var middleware = require('./middleware.js')(db);
var app = express();
var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextId = 1;

app.get('/', function (req, res) {
    res.send('Todo API root');
});

app.use(bodyParser.json());

/* Get individual booking */
app.get('/bookings/:id', middleware.requireAuthentication, function (req, res) {
    var bookingId = parseInt(req.params.id, 10);

    db.booking.findById(bookingId).then(function (booking) {
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

/* Get all bookings */
app.get('/bookings', middleware.requireAuthentication,  function (req, res) {
    var query = req.query;
    var where = {};
    
    if (query.hasOwnProperty('bookedBy')) {
        where.bookedBy = query.bookedBy;
    }
    if (query.hasOwnProperty('roomNumber')) {
        where.roomNumber = query.roomNumber;
    }
    if (query.hasOwnProperty('endDate')) {
        where.endDate = query.endDate;
    }
    if (query.hasOwnProperty('startDate')) {
        where.startDate = query.StartDate;
    }

/*    if (query.hasOwnProperty('q') && query.q.length > 0) {
        where.description = {
            "$like": '%' + query.q + '%'
        };
    }*/

    db.booking.findAll({
        "where": where
    }).then(function (bookings) {
        res.json(bookings);
    }).catch(function (err) {
        res.status(500).send(err);
    });
});

/* POST Create new booking*/
app.post('/bookings', middleware.requireAuthentication,  function (req, res) {
    var body = _.pick(req.body, 'endDate', 'startDate', 'bookedAt', 'bookedBy', 'roomNumber');

    db.booking.create(body).then(function (booking) {
        res.json(booking.toJSON());
    }).catch(function (err) {
        res.status(400).json(err);
    });
});


/* DELETE a todo */
app.delete('/bookings/:id', middleware.requireAuthentication,  function (req, res) {
    var bookingId = parseInt(req.params.id, 10);

    /* Find the ID to be Destroyed, destroy it */
    db.booking.destroy({
        "where": {
            "id": bookingId
        }
    }).then(function (rowsDeleted) {
        if (rowsDeleted === 0) {
            res.status(404).json({
                "error": "Todo not found"
            });
        } else {
            res.status(204).send();
        }
    }).catch(function (err) {
        res.status(500).json(err);
    });
});

/* PUT updates a specific booking*/
app.put('/bookings/:id', middleware.requireAuthentication,  function (req, res) {
    var body = _.pick(req.body, 'endDate', 'startDate', 'bookedAt', 'bookedBy', 'roomNumber');
    var attributes = {};
    var bookingId = parseInt(req.params.id, 10);


    /* Validate the completed status */
    if (body.hasOwnProperty('completed')) {
        attributes.completed = body.completed;
    }

    /* Validate the description */
    if (body.hasOwnProperty('description')) {
        attributes.description = body.description;
    }

    db.todo.findById(todoId).then(function (todo) {
        if (!_.isNull(todo)) {
            todo.update(attributes).then(function (todo) {
                res.json(todo.toJSON());
            }, function (e) {
                res.status(400).json(e);
            });
        } else {
            res.status(404).send();
        }
    }, function () {
        res.status(500).send();
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

    db.user.authenticate(body).then(function(user) {
        var token = user.generateToken('authentication');
        if (!_.isNull(token)) {
            res.header('Auth', token).json(user.toPublicJSON());
        } else {
            res.status(401).send();
        }
        
    }, function (err) {
        res.status(401).send();
    });
});

// Sync the database
db.sequelize.sync({force: true}).then(function () {
    app.listen(PORT, function () {
        console.log('Express listening on port ' + PORT);
    });
});