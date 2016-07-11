module.exports = function (sequelize, DataTypes) {
    return sequelize.define('hotel', {
        "phoneNo": {
            "type": DataTypes.INTEGER
            , "allowNull": false
            , "validate": {
                "isNumeric": true
                , "len": [10, 12]
            }
        }
        , "name": {
            "type": DataTypes.STRING
            , "allowNull": false
            , "validate": {
                is: ["^[a-z ]+$",'i']
                , "notEmpty": true
            }
        }
        , "street": {
            "type": DataTypes.STRING
            , "allowNull": false
            , "validate": {
                is: ["^[a-z0-9 ]+$",'i']
                , "notEmpty": true
            }
        }
        , "city": {
            "type": DataTypes.STRING
            , "allowNull": false
            , "validate": {
                is: ["^[a-z ]+$",'i']
                , "notEmpty": true
            }
        }
        , "zipcode": {
            "type": DataTypes.INTEGER
            , "allowNull": false
            , "validate": {
                "isNumeric": true
                , "len": [5]
            }
        }
        , "country": {
            "type": DataTypes.STRING
            , "allowNull": false
            , "validate": {
                is: ["^[a-z ]+$",'i']
                , "notEmpty": true
            }
        }
    });
};