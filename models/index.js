const User = require('./User');
const Role = require('./Role');
const Permission = require('./Permission');
const Todo = require('./Todo');

User.belongsToMany(Role, { through: 'UserRoles' });
Role.belongsToMany(User, { through: 'UserRoles' });

Role.belongsToMany(Permission, { through: 'RolePermissions' });
Permission.belongsToMany(Role, { through: 'RolePermissions' });

User.hasMany(Todo)
Todo.belongsTo(User)

module.exports = {
    User,
    Role,
    Permission,
};
