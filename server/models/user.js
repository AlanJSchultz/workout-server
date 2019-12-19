module.exports = function (sequelize, DataTypes) {
    return sequelize.define('user', {
        // column name : DataType
        username: DataTypes.STRING,
        passwordhash: DataTypes.STRING
    });
};
