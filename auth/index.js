const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        if (username && await User.findOne({ where: { username } })) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }
        const user = await User.create({ username, password });
        res.status(201).json({ message: 'User registered', userId: user.id });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ where: { username } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        res.json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;