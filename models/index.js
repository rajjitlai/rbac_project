require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: process.env.DB || './rbac.sqlite',
    logging: false,
});

const User = require('./User');
const Role = require('./Role');
const Permission = require('./Permission');
const Todo = require('./Todo');

User.belongsToMany(Role, { through: 'UserRoles', as: 'roles' });
Role.belongsToMany(User, { through: 'UserRoles', as: 'users' });

Role.belongsToMany(Permission, { through: 'RolePermissions', as: 'permissions' });
Permission.belongsToMany(Role, { through: 'RolePermissions', as: 'roles' });

Todo.belongsTo(User);
User.hasMany(Todo);

module.exports = {
    sequelize,
    User,
    Role,
    Permission,
    Todo,
};
