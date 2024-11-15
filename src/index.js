const express = require('express');
const dotenv = require('dotenv');
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();

dotenv.config();

const PORT = process.env.PORT;

app.use(express.json())

app.get("/api", (req, res) => {
    res.send("Selamat Datang di API saya");
});

app.get("/products", async (req, res) => {
    const products = await prisma.product.findMany();

    res.send(products);
});

app.post("/products", async (req, res) => {
    const productData = req.body;

    const product = await prisma.product.create({
        data: {
            name: productData.name,
            description: productData.description,
            image: productData.image,
            price: productData.price,
        },
    });

    res.send({
        data: product,
        message: "create product succsess"
    });
});

app.delete("/products/:id", async (req, res) => {
    const productId = req.params.id // masih string

    await prisma.product.delete({
        where: {
            id: parseInt(productId),
        },
    });

    res.send("product deleted")
});

app.put("/product/:id", async (req, res) => {
    const productId = req.params.id;
    const productData = req.body;

    const product = await prisma.product.update({
        where: {
            id: productId
        },
        data: {
            name: productData.name,
            description: productData.description,
            image: productData.image,
            price: productData.price,
        },
    });
    
    req.send({
        data: product,
        message: "edit product succsess"
    })
});

app.listen(PORT, () => {
    console.log("Express API running in port: " + PORT);
});
