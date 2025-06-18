const express = require('express');
const router = express.Router();
const productsData = require('../data/products.json');

// In-memory cart storage (this should be replaced with a proper database in production)
let cart = [];

// GET /cart
router.get('/', (req, res) => {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    res.render('cart', { 
        title: 'Shopping Cart',
        cart,
        total: total.toFixed(2)
    });
});

// POST /cart/add
router.post('/add', (req, res) => {
    const { productId, quantity } = req.body;
    const product = productsData.products.find(p => p.id === productId);
    
    if (product) {
        const cartItem = cart.find(item => item.id === productId);
        if (cartItem) {
            cartItem.quantity += parseInt(quantity) || 1;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: parseInt(quantity) || 1
            });
        }
    }
    res.redirect('/cart');
});

// POST /cart/remove
router.post('/remove', (req, res) => {
    const { productId } = req.body;
    cart = cart.filter(item => item.id !== productId);
    res.redirect('/cart');
});

module.exports = router; 