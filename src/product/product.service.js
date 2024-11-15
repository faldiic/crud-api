// Servis layer bertujuan untuk handle business logic
// agar tanggung jawabnya terisolate
// functionnya reusable artinya bisa digunakan berkali kali

const prisma = require("../db");
const { findProducts, findProductById, insertProduct, deleteProduct, editProduct } = require("./product.repository");

const getAllProducts = async () => {
    const products = await findProducts();

    return products;
};

const getProductById = async (id) => {
    const product = await findProductById(id);

    if (!product) {
        throw Error("Product not found");
    }
    
    return product;
};

const createProduct = async (newProductData) => {   
    const product = await insertProduct(newProductData);

    return product;
};

const deleteProductById = async (id) => {
    await getProductById(id);
        
    await deleteProduct(id);
    // DELETE FROM product WHERE id = {productId}
};

const editProductById = async (id, productData) => {
    await getProductById(id);

    const product = await editProduct(id, productData)

    return product;
};


module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    deleteProductById,
    editProductById,
}