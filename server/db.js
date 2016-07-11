var Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development';
var sequelize;

/* If production environment, we use postgres, otherwise we use sqlite */
if (env === 'production') {
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        "dialect": 'postgres'
    });
} else {
    sequelize = new Sequelize(undefined, undefined, undefined, {
        "dialect": 'sqlite'
        , "storage": __dirname + '/data/dev-hotel-booking.sqlite'
    });
}


var db = {};

// Create the entities
db.user = sequelize.import(__dirname + '/models/user.js');
db.hotel = sequelize.import(__dirname + '/models/hotel.js');
db.room = sequelize.import(__dirname + '/models/room.js');
db.booking = sequelize.import(__dirname + '/models/booking.js');
db.token = sequelize.import(__dirname + '/models/token.js');
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Set relationships between tables
db.hotel.hasMany(db.room);
db.booking.hasMany(db.room);
db.booking.belongsTo(db.user);
db.user.hasMany(db.booking);

module.exports = db;