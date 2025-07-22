const express = require('express');
const checkPermission = require('../middleware/checkPermission');
const router = express.Router();
const Todo = require('../models/Todo');

router.post('/todos', checkPermission('todo:create'), async (req, res) => {
    try {
        const { title } = req.body;
        if (!title) {
            return res.status(400).json({ error: 'Title is required' });
        }

        const todo = await Todo.create({ title, UserId: req.user.id });
        res.status(201).json({ message: 'Todo created successfully', todo });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create todo' });
    }
});

router.get('/todos', checkPermission('todo:read'), async (req, res) => {
    try {
        const todos = await Todo.findAll({ where: { UserId: req.user.id } });
        res.status(200).json(todos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve todos' });
    }
});

module.exports = router;
