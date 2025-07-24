const express = require('express');
const { Role, Permission, User } = require('../models');
const router = express.Router();

/**
 * @swagger
 * /roles:
 *   post:
 *     summary: Create a new role
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Role created
 *       400:
 *         description: Invalid input
 */

router.post('/roles', async (req, res) => {
    const { name } = req.body;
    try {
        const role = await Role.create({ name });
        res.status(201).json(role);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

/**
 * @swagger
 * /permissions:
 *   post:
 *     summary: Create a new permission
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Permission created
 */
router.post('/permissions', async (req, res) => {
    const { name } = req.body;
    try {
        const permission = await Permission.create({ name });
        res.status(201).json(permission);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

/**
 * @swagger
 * /assign-role:
 *   post:
 *     summary: Assign a role
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Role assigned
 */

router.post('/assign-role', async (req, res) => {
    const { userId, roleId } = req.body;
    try {
        const user = await User.findByPk(userId);
        const role = await Role.findByPk(roleId);
        if (!user || !role) return res.status(404).json({ error: 'User or Role not found' });
        await user.addRole(role);
        res.json({ message: 'Role assigned' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

/**
 * @swagger
 * /assign-permission:
 *   post:
 *     summary: Assign permission
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Permission assigned
 */

router.post('/assign-permission', async (req, res) => {
    const { roleId, permissionId } = req.body;
    try {
        const role = await Role.findByPk(roleId);
        const permission = await Permission.findByPk(permissionId);
        if (!role || !permission) return res.status(404).json({ error: 'Role or Permission not found' });
        await role.addPermission(permission);
        res.json({ message: 'Permission assigned' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;