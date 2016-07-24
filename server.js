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
        //console.log(JSON.stringify(data));
        /*for (var i = 0; i < data.users.length; i++) {
           	db.user.create(data.users[i]).then( function (res) {
                console.log('\nUsers inserted successfully\n');
            }, function (err) {
                console.log('\nError inserting users\n');
            });
        }
        for (var i = 0; i < data.hotels.length; i++) {
            db.hotel.create(data.hotels[i]).then( function (res) {
                console.log('\nHotels inserted successfully\n');
            }, function (err) {
                console.log('\nError inserting hotels\n');
            });
        }
        for (var i = 0; i < data.rooms.length; i++) {
            db.room.create(data.rooms[i]).then( function (res) {
                console.log('\nRooms inserted successfully\n');
            }, function (err) {
                console.log('\nError inserting rooms\n');
            });
        }
        for''' (var i = 0; i < data.bookings.length; i++) {
            db.booking.create(data.bookings[i]).then( function (res) {
                console.log('\nBookings inserted successfully\n');
            }, function (err) {
                console.log('\nError inserting bookings\n');
            });
        }*/
        
        /*Promise.all(db.user.create(data.users)).then(function (res) {
            console.log('users inserted successfully');
        }, function (err) {
        	console.log('error promise all; ' + err);
        });*/
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
        });
    });
});