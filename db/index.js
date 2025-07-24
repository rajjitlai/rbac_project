require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db/rbac.sqlite',
  logging: false,
});

module.exports = sequelize;
