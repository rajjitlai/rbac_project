const express = require('express');
const authMiddleware = require('../middleware/auth');
const rbacMiddleware = require('../middleware/rbac');
const { Product, Cart, CartItem } = require('../models');
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
router.get('/products', async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
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
router.post('/products', authMiddleware, rbacMiddleware('product:create'), async (req, res) => {
    try {
        const { name } = req.body;
        const product = await Product.create({ name });
        res.json({ message: 'Product created', product });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Failed to create product' });
    }
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
router.post('/cart', authMiddleware, rbacMiddleware('cart:modify'), async (req, res) => {
    try {
        const { productId } = req.body;

        const product = await Product.findByPk(productId);
        if (!product) return res.status(404).json({ error: 'Product not found' });

        const cartItem = await Cart.create({
            productId,
            userId: req.user.id
        });

        res.json({ message: 'Product added to cart', cartItem });
    } catch (error) {
        console.error('Cart modify error:', error);
        res.status(500).json({ error: 'Failed to modify cart' });
    }
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
router.post('/checkout', authMiddleware, rbacMiddleware('checkout:perform'), async (req, res) => {
    try {
        await Cart.destroy({ where: { userId: req.user.id } });
        res.json({ message: 'Checkout completed. Cart cleared.' });
    } catch (error) {
        console.error('Checkout error:', error);
        res.status(500).json({ error: 'Checkout failed' });
    }
});

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Get checkout
 *     tags: [Checkout]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Fetched checkout
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 message: Checkout data fetched
 */
router.get('/cart', authMiddleware, async (req, res) => {
    try {
        const cartItems = await CartItem.findAll({
            where: { userId: req.user.id },
            include: [{
                model: Product,
                attributes: ['name']
            }]
        });

        const result = cartItems.map(item => ({
            id: item.id,
            productId: item.productId,
            productName: item.product ? item.Product.name : 'Unknown Product'
        }));

        console.log(result)
        res.json(result);
    } catch (error) {
        console.error('Cart fetch error:', error);
        res.status(500).json({ error: 'Failed to fetch cart' });
    }
});


module.exports = router;