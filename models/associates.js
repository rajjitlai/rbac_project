
const sequelize = require('./index');
const User = require('./User');
const Role = require('./Role');
const Permission = require('./Permission');
const Todo = require('./Todo');

User.belongsToMany(Role, { through: 'UserRoles' });
Role.belongsToMany(User, { through: 'UserRoles' });

Role.belongsToMany(Permission, { through: 'RolePermissions' });
Permission.belongsToMany(Role, { through: 'RolePermissions' });

Todo.belongsTo(User);
User.hasMany(Todo);

module.exports = {
    sequelize,
    User,
    Role,
    Permission,
    Todo
};