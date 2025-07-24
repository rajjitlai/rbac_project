const express = require('express');
const authMiddleware = require('../middleware/auth');
const rbacMiddleware = require('../middleware/rbac');
const router = express.Router();

/**
 * @swagger
 * /todos:
 *   post:
 *     summary: Create Todo
 *     responses:
 *       200:
 *         description: Create a new Todo
 */
router.post('/todos', authMiddleware, rbacMiddleware('todo:create'), (req, res) => {
    res.json({ message: 'Todo created' });
});

/**
 * @swagger
 * /todos:
 *   get:
 *     summary: Get all todos
 *     responses:
 *       200:
 *         description: List of todos
 */
router.get('/todos', authMiddleware, rbacMiddleware('todo:read'), (req, res) => {
    res.json({ message: 'List of todos' });
});

/**
 * @swagger
 * /todos/:id:
 *   put:
 *     summary: Update Todo
 *     responses:
 *       200:
 *         description: Update a specific Todo
 */
router.put('/todos/:id', authMiddleware, rbacMiddleware('todo:update'), (req, res) => {
    res.json({ message: `Todo ${req.params.id} updated` });
});

/**
 * @swagger
 * /todos/:id:
 *   delete:
 *     summary: Delete a Todo
 *     responses:
 *       200:
 *         description: Delete a Specific Todo
 */
router.delete('/todos/:id', authMiddleware, rbacMiddleware('todo:delete'), (req, res) => {
    res.json({ message: `Todo ${req.params.id} deleted` });
});

module.exports = router;