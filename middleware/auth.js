const jwt = require('jsonwebtoken');
const { User, Role, Permission } = require('../models');

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(decoded.userId, {
            include: [{ model: Role, include: [Permission] }],
        });
        if (!user) return res.status(404).json({ error: 'User not found' });
        req.user = { id: user.id };
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = authMiddleware;