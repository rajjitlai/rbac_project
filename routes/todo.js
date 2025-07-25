const express = require('express');
const authMiddleware = require('../middleware/auth');
const rbacMiddleware = require('../middleware/rbac');
const Todo = require('../models/Todo');
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
router.post('/todos', authMiddleware, rbacMiddleware('todo:create'), async (req, res) => {    
    const { title } = req.body
    const todo = await Todo.create({
        title,
        UserId: req.user.id
    })
    res.json({ message: 'Todo created' }, todo);
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
router.get('/todos', authMiddleware, rbacMiddleware('todo:read'), async (req, res) => {
    const todos = await Todo.findAll()
    res.json(todos);
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
router.put('/todos/:id', authMiddleware, rbacMiddleware('todo:update'), async (req, res) => {
    try {
        const { id } = req.params
        const { title } = req.body
        const todo = await Todo.findOne({ where: { id, UserId: req.user.id } });
        if (!todo) {
            return res.status(404).json({ error: 'Todo not found or not authorized' });
        }

        todo.title = title;
        await todo.save();

        res.json({ message: `Todo ${id} updated`, todo });
    } catch (error) {
        console.error('Update error:', error);
        res.status(500).json({ error: 'Failed to update todo' });
    }
}
);

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
router.delete('/todos/:id', authMiddleware, rbacMiddleware('todo:delete'), async (req, res) => {
    try {
        const { id } = req.params;

        const todo = await Todo.findOne({
            where: { id, UserId: req.user.id }
        });

        if (!todo) {
            return res.status(404).json({ error: 'Todo not found or not authorized' });
        }

        await todo.destroy();

        res.json({ message: `Todo ${id} deleted successfully` });
    } catch (error) {
        console.error('Delete error:', error);
        res.status(500).json({ error: 'Failed to delete todo' });
    }
});


module.exports = router;