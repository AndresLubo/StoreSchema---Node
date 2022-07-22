console.log('My-store');

const express = require('express');
const config = require('./config')

const app = express()


app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.get('/products', (req, res) => {
    res.json({
        "name": "Product 1",
        "price": "100"
    });
})


app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
})