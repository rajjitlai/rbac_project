const express = require('express');
const { User, Role, Permission } = require('../models/associates')

const router = express.Router();

router.post('/roles', async (req, res) => {
    try {
        const { name } = req.body;
        const role = await Role.create({ name });
        res.status(201).json(role);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create role' });
    }
})

router.post('/permissions', async (req, res) => {
    try {
        const { name } = req.body;
        const permission = await Permission.create({ name });
        res.status(201).json(permission);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create permission' });
    }
})

router.post('/assign-role', async (req, res) => {
    try {
        const { userId, roleId } = req.body;
        const user = await User.findByPk(userId);
        const role = await Role.findByPk(roleId);
        if (!user || !role) {
            return res.status(404).json({ error: 'User or role not found' });
        }
        await user.addRole(role);
        res.status(200).json({ message: 'Role assigned successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to assign role' });
    }
})

router.post('/assign-permission', async (req, res) => {
    try {
        const { roleId, permissionId } = req.body;
        const role = await Role.findByPk(roleId);
        const permission = await Permission.findByPk(permissionId);
        if (!role || !permission) {
            return res.status(404).json({ error: 'Role or permission not found' });
        }
        await role.addPermission(permission);
        res.status(200).json({ message: 'Permission assigned successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to assign permission' });
    }
})

module.exports = router;