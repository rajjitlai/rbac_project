require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DB || './rbac.sqlite',
  logging: false,
});

module.exports = sequelize;
