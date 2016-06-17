var _ = require('underscore');

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('room', {
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
    })
};