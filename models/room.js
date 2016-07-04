var _ = require('underscore');

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('room', {
        "roomType": {
            "type": DataTypes.STRING
            , "allowNull": false
            , "unique": false
            , "validate": {
                is: ["^[a-z ]+$",'i']
                , "notEmpty": true
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
            "type": DataTypes.INTEGER
            , "allowNull": false
            , "validate": {
                "isNumeric": true
            }
        }
    })
};
