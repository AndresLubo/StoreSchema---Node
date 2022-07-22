console.log('My-store');

const express = require('express');
const config = require('./config')
const router = require('./routes/router')

const app = express()


router(app)


app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
})