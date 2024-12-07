const express = require('express');
const prisma = require("../db");
const { getAllProducts, getProductById, createProduct, deleteProductById, editProductById } = require('./product.service');

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const products = await getAllProducts();
        res.status(200).send(products); // 200 OK
    } catch (err) {
        res.status(500).send({ message: "Failed to fetch products", error: err.message }); // 500 Internal Server Error
    }
});

router.get("/:id", async (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        const product = await getProductById(productId);
        
        if (!product) {
            return res.status(404).send({ message: "Product not found" }); // 404 Not Found
        }

        res.status(200).send(product); // 200 OK
    } catch (err) {
        res.status(400).send({ message: "Invalid product ID", error: err.message }); // 400 Bad Request
    }
});

router.post("/", async (req, res) => {
    try {
        const newProductData = req.body;
        const product = await createProduct(newProductData);
        
        res.status(201).send({
            data: product,
            message: "Product created successfully", // 201 Created
        });
    } catch (err) {
        res.status(400).send({ message: "Failed to create product", error: err.message }); // 400 Bad Request
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const productId = parseInt(req.params.id);

        const deletedProduct = await deleteProductById(productId);
        if (!deletedProduct) {
            return res.status(404).send({ message: "Product not found" }); // 404 Not Found
        }

        res.status(200).send({ message: "Product deleted successfully" }); // 200 OK
    } catch (err) {
        res.status(400).send({ message: "Invalid product ID", error: err.message }); // 400 Bad Request
    }
});

router.put("/:id", async (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        const productData = req.body;
        
        if (!productData.image || !productData.name || !productData.description || !productData.price) {
            return res.status(400).send({ message: "Some fields are missing" }); // 400 Bad Request
        }

        const product = await editProductById(productId, productData);
        if (!product) {
            return res.status(404).send({ message: "Product not found" }); // 404 Not Found
        }

        res.status(200).send({
            data: product,
            message: "Product updated successfully", // 200 OK
        });
    } catch (err) {
        res.status(500).send({ message: "Failed to update product", error: err.message }); // 500 Internal Server Error
    }
});

router.patch("/:id", async (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        const productData = req.body;

        const product = await editProductById(productId, productData);
        if (!product) {
            return res.status(404).send({ message: "Product not found" }); // 404 Not Found
        }

        res.status(200).send({
            data: product,
            message: "Product updated successfully", // 200 OK
        });
    } catch (err) {
        res.status(400).send({ message: "Failed to update product", error: err.message }); // 400 Bad Request
    }
});

module.exports = router;
