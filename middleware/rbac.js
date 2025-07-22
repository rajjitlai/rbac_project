const { Permission } = require('../models');

const rbacMiddleware = (requiredPermission) => async (req, res, next) => {
    const user = req.user;
    const permissions = await user.getRoles({
        include: [{ model: Permission }],
    }).then(roles =>
        roles.flatMap(role => role.Permissions.map(perm => perm.name))
    );

    if (!permissions.includes(requiredPermission)) {
        return res.status(403).json({ error: 'Permission denied' });
    }
    next();
};

module.exports = rbacMiddleware;