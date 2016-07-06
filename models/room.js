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
        , "view": {
            "type": DataTypes.STRING
            , "allowNull": false
            , "validate": {
                "isAlpha": true
            }
        }
        , "numBed": {
            "type": DataTypes.INTEGER
            , "allowNull": false
            , "validate": {
                "isNumeric": true
            }
        }
        , "numBath": {
            "type": DataTypes.INTEGER
            , "allowNull": false
            , "validate": {
                "isNumeric": true
            }
        }
        , "kitchen": {
            "type": DataTypes.INTEGER
            , "allowNull": false
            , "validate": {
                "isNumeric": true
            }
        }
    }, {
        getterMethods: {
            getRoom: function () {
                return {
                    roomType: this.roomType
                    , pricePerNight: this.pricePerNight
                    , inService: this.inService
                    , view: this.view
                    , numBed: this.numBed
                    , numBath: this.numBath
                    , kitchen: this.kitchen
                };
            }
            , getRoomSize: function () {
                return {
                    view: this.view
                    , numBed: this.numBed
                    , numBath: this.numBath
                    , kitchen: this.kitchen
                };
            }
        }
    })
};
