var bcrypt = require('bcryptjs');
var _ = require('underscore');

module.exports = function (sequlize, DataTypes) {
    return sequlize.define('room', {
        "roomNumber": {
            "type": DataTypes.INTEGER
            , "allowNull": false
            , "unique": true
            , "validate": {
                "isNumeric": true
            }
        }
        , "roomType": {
            "type": DataTypes.STRING
            , "allowNull": false
            , "unique": false
            , "validate": {
                "isAlpha": true
            }
        }
        , "pricePerNight": {
            "type": DataTypes.FLOAT
            , "allowNull": false
            , "unique": false
            , "validate": {
                "isFloat": true
            }
        }
        , "inService": {
            "type": DataTypes.BOOLEAN
            , "allowNull": false
            , "validate": {
                "isNumeric": true
            }
        }
        /*, "password": {
            "type": DataTypes.VIRTUAL
            , "allowNull": false
            , "validate": {
                "len": [7, 100]
            }
            , "set": function (value) {
                var salt = bcrypt.genSaltSync(10);
                var hashedPassword = bcrypt.hashSync(value, salt);

                this.setDataValue('password', value);
                this.setDataValue('salt', salt);
                this.setDataValue('password_hash', hashedPassword);
            }
        }*/
    }
};