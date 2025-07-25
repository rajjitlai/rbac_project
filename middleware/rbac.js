const { Permission, User, Role } = require('../models');

const rbacMiddleware = (requiredPermission) => async (req, res, next) => {
    const user = await User.findByPk(req.user.id, {
        include: [{ model: Role, include: [Permission] }],
    });
    if (!user) return res.status(404).json({ error: "User not found" })
    const permissions = user.Roles.flatMap(role =>
        role.Permissions.map(perm => perm.name)
    );

    if (!permissions.includes(requiredPermission)) {
        return res.status(403).json({ error: 'Permission denied' });
    }
    next();
};

module.exports = rbacMiddleware;