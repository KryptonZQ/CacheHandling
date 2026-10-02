const express = require('express');

const router = express.Router();

const productController =
    require('../controllers/productController');

const {
    cacheMiddleware
} = require('../middleware/cache');


// GET /products
router.get(
    '/products',
    cacheMiddleware,
    productController.getProducts
);


// GET /products/:id
router.get(
    '/products/:id',
    cacheMiddleware,
    productController.getProductById
);


// POST /products
router.post(
    '/products',
    productController.createProduct
);


// PUT /products/:id
router.put(
    '/products/:id',
    productController.updateProduct
);


// DELETE /products/:id
router.delete(
    '/products/:id',
    productController.deleteProduct
);


module.exports = router;