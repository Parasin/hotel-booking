var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var db = require(__dirname + '/server/db.js');
var data = require(__dirname + '/server/json.js');
var middleware = require(__dirname + '/server/middleware.js')(db);
var app = express();

var path = require('path');
var PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.sendFile('index.html', {root: __dirname});
    //console.log(req.connection.remoteAddress);
});

app.use(bodyParser.json());
require(__dirname + '/server/routes.js')(app, _, middleware, db, bodyParser);

// Sync the database
db.sequelize.sync( {force: true} ).then(function () {
    app.listen(PORT, function () {
        console.log('Express listening on port ' + PORT);
        db.user.bulkCreate(data.users).then(function () {
            console.log('\nUsers inserted successfully\n');
            return db.hotel.bulkCreate(data.hotels);
        }).then(function () {
            console.log('\nHotels inserted successfully\n');
            return db.room.bulkCreate(data.rooms);
        }).then(function () {
            console.log('\nRooms inserted successfully\n');
            return db.booking.bulkCreate(data.bookings);
        }).then(function () {
            console.log('\nBookings inserted successfully\n');
            return db.sequelize.query('DROP VIEW IF EXISTS user_bookings;');
        }).then(function (res) {
            console.log('\nuser_bookings view dropped successfully\n');
            return db.sequelize.query('CREATE VIEW user_bookings AS ' +
                'SELECT id, bookedBy, roomNumber, startDate, endDate, userId ' +
                'FROM bookings;', {model: db.bookings});
        }).then(function (res) {
            console.log('\nuser_bookings view created successfully\n');
        }).catch(function (err) {
            console.log('Error initializing data: ' + err);
        });
    });
});