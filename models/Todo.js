const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');

const Todo = sequelize.define('Todo', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    completed:
    {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
})

Todo.belongsTo(User);
User.hasMany(Todo);

module.exports = Todo;