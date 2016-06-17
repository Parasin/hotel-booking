module.exports = function (sequelize, DataTypes) {
    return sequelize.define('userType', {
        "vipStatus": {
            "type": DataTypes.BOOLEAN
            , "allowNull": false
        }
        , "userId": {
            "type": DataTypes.INTEGER
            , "unique": true
            , "allowNull": false
        }
        , "frequentUser": {
            "type": DataTypes.BOOLEAN
            , "allowNull": false
            , "defaultValue": false
        }
    });
};