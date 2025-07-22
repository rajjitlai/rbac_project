const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Todo = sequelize.define('Todo', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId:
    {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
})

module.exports = Todo;