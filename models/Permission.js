const {DataTypes} = require('sequelize');
const sequelize = require('../db');

const Permission = sequelize.define('Permission', {
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
})

module.exports = Permission;