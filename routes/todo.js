const express = require('express');
const authMiddleware = require('../middleware/auth');
const rbacMiddleware = require('../middleware/rbac');
const router = express.Router();


/**
 * @swagger
 * /todos:
 *   post:
 *     summary: Create a Todo
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Buy groceries
 *               completed:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       201:
 *         description: Todo created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 message: Todo created
 */
router.post('/todos', authMiddleware, rbacMiddleware('todo:create'), (req, res) => {
    res.json({ message: 'Todo created' });
});

/**
 * @swagger
 * /todos:
 *   get:
 *     summary: Get all Todos
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of Todos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 message: List of todos
 */
router.get('/todos', authMiddleware, rbacMiddleware('todo:read'), (req, res) => {
    res.json({ message: 'List of todos' });
});


/**
 * @swagger
 * /todos/{id}:
 *   put:
 *     summary: Update a Todo
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the todo to update
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Go to gym
 *               completed:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Todo updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 message: Todo 1 updated
 */
router.put('/todos/:id', authMiddleware, rbacMiddleware('todo:update'), (req, res) => {
    res.json({ message: `Todo ${req.params.id} updated` });
});

/**
 * @swagger
 * /todos/{id}:
 *   delete:
 *     summary: Delete a Todo
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the todo to delete
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Todo deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 message: Todo 1 deleted
 */
router.delete('/todos/:id', authMiddleware, rbacMiddleware('todo:delete'), (req, res) => {
    res.json({ message: `Todo ${req.params.id} deleted` });
});

module.exports = router;