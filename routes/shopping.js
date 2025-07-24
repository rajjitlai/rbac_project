const express = require('express');
const authMiddleware = require('../middleware/auth');
const rbacMiddleware = require('../middleware/rbac');
const router = express.Router();

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     responses:
 *       200:
 *         description: List of products
 */
router.get('/products', (req, res) => {
    res.json({ message: 'List of products' });
});

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a product
 *     responses:
 *       200:
 *         description: Creating a product
 */
router.post('/products', authMiddleware, rbacMiddleware('product:create'), (req, res) => {
    res.json({ message: 'Product created' });
});

/**
 * @swagger
 * /cart:
 *   post:
 *     summary: Modify a cart
 *     responses:
 *       200:
 *         description: Cart Modified
 */
router.post('/cart', authMiddleware, rbacMiddleware('cart:modify'), (req, res) => {
    res.json({ message: 'Cart modified' });
});

/**
 * @swagger
 * /checkout:
 *   post:
 *     summary: Checkout perform
 *     responses:
 *       200:
 *         description: Checkout completed
 */
router.post('/checkout', authMiddleware, rbacMiddleware('checkout:perform'), (req, res) => {
    res.json({ message: 'Checkout completed' });
});

module.exports = router;