
const sequelize = require('./index');
const User = require('./User');
const Role = require('./Role');
const Permission = require('./Permission');

User.belongsToMany(Role, { through: 'UserRoles' });
Role.belongsToMany(User, { through: 'UserRoles' });

Role.belongsToMany(Permission, { through: 'RolePermissions' });
Permission.belongsToMany(Role, { through: 'RolePermissions' });

module.exports = {
    sequelize,
    User,
    Role,
    Permission
};