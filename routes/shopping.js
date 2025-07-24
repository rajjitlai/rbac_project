const express = require('express');
const authMiddleware = require('../middleware/auth');
const rbacMiddleware = require('../middleware/rbac');
const router = express.Router();

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 message: List of products
 */
router.get('/products', (req, res) => {
    res.json({ message: 'List of products' });
});

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Phone
 *               price:
 *                 type: number
 *                 example: 999.99
 *     responses:
 *       201:
 *         description: Product created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 message: Product created
 */
router.post('/products', authMiddleware, rbacMiddleware('product:create'), (req, res) => {
    res.json({ message: 'Product created' });
});

/**
 * @swagger
 * /cart:
 *   post:
 *     summary: Modify a cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: integer
 *                 example: 1
 *               quantity:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Cart modified
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 message: Cart modified
 */
router.post('/cart', authMiddleware, rbacMiddleware('cart:modify'), (req, res) => {
    res.json({ message: 'Cart modified' });
});


/**
 * @swagger
 * /checkout:
 *   post:
 *     summary: Perform checkout
 *     tags: [Checkout]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Checkout completed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 message: Checkout completed
 */
router.post('/checkout', authMiddleware, rbacMiddleware('checkout:perform'), (req, res) => {
    res.json({ message: 'Checkout completed' });
});

module.exports = router;