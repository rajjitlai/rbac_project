const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: process.env.DB || './rbac.sqlite',
    logging: false,
})

module.exports = sequelize;