const express = require('express');
const router = express.Router();
const productsData = require('../data/products.json');

// GET /products
router.get('/', (req, res) => {
    const { brand, minPrice, maxPrice, search } = req.query;
    let filteredProducts = [...productsData.products];

    if (brand) {
        filteredProducts = filteredProducts.filter(p => p.brand.toLowerCase() === brand.toLowerCase());
    }
    if (minPrice) {
        filteredProducts = filteredProducts.filter(p => p.price >= parseFloat(minPrice));
    }
    if (maxPrice) {
        filteredProducts = filteredProducts.filter(p => p.price <= parseFloat(maxPrice));
    }
    if (search) {
        filteredProducts = filteredProducts.filter(p => 
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.description.toLowerCase().includes(search.toLowerCase())
        );
    }

    res.render('products', {
        title: 'Our Products',
        products: filteredProducts,
        brands: [...new Set(productsData.products.map(p => p.brand))],
        filters: { brand, minPrice, maxPrice, search }
    });
});

// GET /products/:id
router.get('/:id', (req, res) => {
    const product = productsData.products.find(p => p.id === req.params.id);
    if (!product) {
        return res.status(404).render('404', { title: 'Product Not Found' });
    }
    res.render('product-detail', { title: product.name, product });
});

// API Routes
router.get('/api/products', (req, res) => {
    res.json(productsData.products);
});

router.get('/api/products/:id', (req, res) => {
    const product = productsData.products.find(p => p.id === req.params.id);
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
});

module.exports = router; 