const {
    readProducts,
    saveProducts
} = require('../database/productDatabase');


async function getAllProducts() {
    const products = await readProducts();

    await new Promise((resolve) => {
        setTimeout(resolve, 1500);
    });

    return products;
}


async function getProductById(id) {
    const products = await getAllProducts();

    return products.find((product) => {
        return product.id === Number(id);
    });
}


async function createProduct(product) {
    const products = await readProducts();

    const newProduct = {
        id: products.length > 0
            ? products[products.length - 1].id + 1
            : 1,
        ...product
    };

    products.push(newProduct);

    await saveProducts(products);

    return newProduct;
}


async function updateProduct(id, data) {
    const products = await readProducts();

    const index = products.findIndex((product) => {
        return product.id === Number(id);
    });

    if (index === -1) {
        return null;
    }

    products[index] = {
        ...products[index],
        ...data
    };

    await saveProducts(products);

    return products[index];
}


async function deleteProduct(id) {
    const products = await readProducts();

    const index = products.findIndex((product) => {
        return product.id === Number(id);
    });

    if (index === -1) {
        return false;
    }

    products.splice(index, 1);

    await saveProducts(products);

    return true;
}


module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};