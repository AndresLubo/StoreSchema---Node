console.log('My-store');

const express = require('express');
const faker = require('faker');
const config = require('./config')

const app = express()


app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.get('/products', (req, res) => {
    const products = []
    const { size } = req.query
    const limit = size || 10

    for (let index = 0; index < limit; index++) {
        products.push({
            name: faker.commerce.productName(),
            price: parseInt(faker.commerce.price(), 10),
            image: faker.image.imageUrl()
        })
    }

    res.json(products);
})

app.get('/products/:id', (req, res) => {
    const { id } = req.params;

    res.json({
        id,
        "name": "Product 1",
        "price": "100"
    })
})

app.get('/products/filter', (req, res) => {
    res.send('Yo soy un filter')
})


app.get('/categories/:categoryId/products/:productId', (req, res) => {
    const { categoryId, productId } = req.params;

    res.json({
        categoryId,
        productId,
    })
})

app.get('/users', (req, res) => {
    const { limit, offset } = req.query

    if (limit && offset) {
        res.json({
            limit,
            offset,
        })
    } else {
        res.send('No hay parámetros query')
    }

})

app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
})