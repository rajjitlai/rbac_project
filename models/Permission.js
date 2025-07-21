const {DataTypes} = require('sequelize');
const sequelize = require('./index');

const Permission = sequelize.define('Permission', {
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
})

module.exports = Permission;