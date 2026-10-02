const productService = require('../services/productService');

const {
    cache,
    clearCache
} = require('../middleware/cache');


// GET /products
async function getProducts(req, res) {
    try {
        const products = await productService.getAllProducts();

        cache[req.originalUrl] = {
            data: products,
            createdAt: Date.now()
        };

        res.set('X-Cache', 'MISS');

        return res.json(products);
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
}


// GET /products/:id
async function getProductById(req, res) {
    try {
        const { id } = req.params;

        const product =
            await productService.getProductById(id);

        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        cache[req.originalUrl] = {
            data: product,
            createdAt: Date.now()
        };

        res.set('X-Cache', 'MISS');

        return res.json(product);
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
}


// POST /products
async function createProduct(req, res) {
    try {
        const product =
            await productService.createProduct(req.body);

        clearCache();

        return res.status(201).json(product);
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
}


// PUT /products/:id
async function updateProduct(req, res) {
    try {
        const { id } = req.params;

        const product =
            await productService.updateProduct(id, req.body);

        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        clearCache();

        return res.json(product);
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
}


// DELETE /products/:id
async function deleteProduct(req, res) {
    try {
        const { id } = req.params;

        const deleted =
            await productService.deleteProduct(id);

        if (!deleted) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        clearCache();

        return res.json({
            message: 'Product deleted successfully'
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
}


module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};