const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const checkUser = await User.findOne({ where: { username } });
        if (checkUser) {
            return res.status(400).json({ error: 'Username already taken. Please choose another one.' });
        }
        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({ username, password: hashed });
        res.status(201).json({ message: 'User registered successfully', id: user.id, username: user.username });
    } catch (err) {
        res.status(500).json({ error: 'Registration failed, please try again after some time!' });
    }
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ where: { username } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token })
    } catch (err) {
        return res.status(500).json({ error: 'Login failed, please try again after some time!' });
    }
})

module.exports = router;