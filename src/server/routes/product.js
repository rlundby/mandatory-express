const express = require('express');

const store = require('../store');

const route = express.Router();

// GET /api/products

route.get('/products', (req, res) => {

    store.getProducts()
        .then(products => res.json({ products }));
})

route.get('/products/:id', (req, res) => {
    const productId = Number(req.params.id);
    
    store.getProduct(productId)
        .then(product => res.json(product))
        .catch(error => {
            res.status(404).json(
                { error }
            );
        });
})

route.post('/products', (req, res) => {
    const productData = req.body;
    
    store.addProduct(productData)
        .then(newProduct => res.json({ newProduct }));

})

module.exports = route;
