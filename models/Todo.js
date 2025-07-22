const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Todo = sequelize.define('Todo', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
},
    {
        timestamps: true
    }
)

module.exports = Todo;