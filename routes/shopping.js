const express = require('express');
const authMiddleware = require('../middleware/auth');
const rbacMiddleware = require('../middleware/rbac');
const router = express.Router();

router.get('/products', (req, res) => {
    res.json({ message: 'List of products' });
});

router.post('/products', authMiddleware, rbacMiddleware('product:create'), (req, res) => {
    res.json({ message: 'Product created' });
});

router.post('/cart', authMiddleware, rbacMiddleware('cart:modify'), (req, res) => {
    res.json({ message: 'Cart modified' });
});

router.post('/checkout', authMiddleware, rbacMiddleware('checkout:perform'), (req, res) => {
    res.json({ message: 'Checkout completed' });
});

module.exports = router;