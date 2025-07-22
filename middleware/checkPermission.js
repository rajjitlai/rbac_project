const jwt = require('jsonwebtoken');
const { User, Role, Permission } = require('../models');

const checkPermission = (permissionName) => {
    return async (req, res, next) => {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            const token = authHeader.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            const user = await User.findByPk(decoded.id, {
                include: {
                    model: Role,
                    as: 'roles',
                    through: [
                        {
                            model: Permission,
                            as: 'permissions'
                        }
                    ],
                },
            });

            if (!user) return res.status(404).json({ message: 'User not found' });

            const permissions = (user.roles || []).flatMap(role =>
                (role.permissions || []).map(p => p.name)
            );

            if (!permissions.includes(permissionName)) {
                return res.status(403).json({ message: 'Forbidden' });
            }

            req.user = user;
            next();
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    };
};

module.exports = checkPermission;
