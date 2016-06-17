var Sequelize = require('sequelize');
var _ = require('underscore');

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('booking', {
        "bookedBy": {
            "type": DataTypes.STRING
            , "allowNull": false
            , "unique": false
            , "validate": {
                "isAlpha": true
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
            "type": DataTypes.DATE
            , "allowNull": false
            , "defaultValue": Sequelize.NOW
            , "validate": {
                "isDate": true
            }
        }
        , "startDate": {
            "type": DataTypes.DATE
            , "allowNull": false
            , "defaultValue": Sequelize.NOW
            , "validate": {
                "isDate": true
            }
        }
        , "endDate": {
            "type": DataTypes.DATE
            , "allowNull": false
            , "defaultValue": Sequelize.NOW
            , "validate": {
                "isDate": true
            }
        }
    });
};