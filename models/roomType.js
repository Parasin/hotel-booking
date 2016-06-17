module.exports = function (sequelize, DataTypes) {
    return sequelize.define('roomType', {
        "kitchen": {
            "type": DataTypes.BOOLEAN
            , "allowNull": false
            , "defaultValue": false
            , "validate": {
                "isNumeric": true
            }
        }
        , "numBath": {
            "type": DataTypes.INTEGER
            , "allowNull": false
            , "defaultValue": 0
            , "validate": {
                "isNumeric": true
            }
        }
        , "numBed": {
            "type": DataTypes.INTEGER
            , "allowNull": false
            , "defaultValue": 0
            , "validate": {
                "isNumeric": true
            }
        }
        , "views": {
            "type": DataTypes.STRING
            , "allowNull": false
            , "defaultValue": "Courtyard"
            , "validate": {
                "isAlpha": true
            }
        }
    });
};