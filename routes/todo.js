const express = require('express');
const authMiddleware = require('../middleware/auth');
const rbacMiddleware = require('../middleware/rbac');
const router = express.Router();

router.post('/todos', authMiddleware, rbacMiddleware('todo:create'), (req, res) => {
    res.json({ message: 'Todo created' });
});

router.get('/todos', authMiddleware, rbacMiddleware('todo:read'), (req, res) => {
    res.json({ message: 'List of todos' });
});

router.put('/todos/:id', authMiddleware, rbacMiddleware('todo:update'), (req, res) => {
    res.json({ message: `Todo ${req.params.id} updated` });
});

router.delete('/todos/:id', authMiddleware, rbacMiddleware('todo:delete'), (req, res) => {
    res.json({ message: `Todo ${req.params.id} deleted` });
});

module.exports = router;