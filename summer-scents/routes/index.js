const express = require('express');
const router = express.Router();
const productsData = require('../data/products.json');

// Home page
router.get('/', (req, res) => {
    res.render('home', {
        title: 'Summer Scents',
        products: productsData.products.slice(0, 3), // Featured products
    });
});

// About page
router.get('/about', (req, res) => {
    res.render('about', { title: 'About Us' });
});

// Contact page
router.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact Us' });
});

module.exports = router; 