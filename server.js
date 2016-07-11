var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var db = require('./db.js');
var data = require(__dirname + '/public/javascript/json.js');
var middleware = require('./middleware.js')(db);
var app = express();

var path = require('path');
var PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.sendFile('index.html', {root: __dirname});
    //console.log(req.connection.remoteAddress);
});

app.use(bodyParser.json());
require('./routes.js')(app, _, middleware, db, bodyParser);


// Sync the database
db.sequelize.sync( {force: true} ).then(function () {
    app.listen(PORT, function () {
        console.log('Express listening on port ' + PORT);
        //console.log(JSON.stringify(data));
        for (var i = 0; i < data.users.length; i++) {
            db.user.create(data.users[i]).then();
        }
        for (var i = 0; i < data.hotels.length; i++) {
            db.hotel.create(data.hotels[i]).then();
        }
        for (var i = 0; i < data.rooms.length; i++) {
            db.room.create(data.rooms[i]).then();
        }
    });
});