const User = require('./User');
const Role = require('./Role');
const Permission = require('./Permission');
const Todo = require('./Todo');
const Cart = require('./Cart');
const Product = require('./Product');
const CartItem = require('./CartItem')

User.belongsToMany(Role, { through: 'UserRoles' });
Role.belongsToMany(User, { through: 'UserRoles' });

Role.belongsToMany(Permission, { through: 'RolePermissions' });
Permission.belongsToMany(Role, { through: 'RolePermissions' });

User.hasMany(Todo)
Todo.belongsTo(User)

// Shopping
User.hasOne(Cart, { foreignKey: 'userId' });
Cart.belongsTo(User, {foreignKey: 'userId'});

CartItem.belongsTo(Cart, { foreignKey: 'cartId' });
CartItem.belongsTo(Product, { foreignKey: 'productId' });
Cart.hasMany(CartItem, { foreignKey: 'cartId' });
Product.hasMany(CartItem, { foreignKey: 'productId' });

Cart.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
    User,
    Role,
    Permission,
    Todo,
    Cart,
    CartItem,
    Product
};
