const express = require('express');

const productsRouter = require('./productsRouter');
const usersRouter = require('./usersRouter');
const categoriesRouter = require('./categoriesRouter');

const routerApi = (server) => {
    const router = express.Router();

    server.use('/api/v1', router)

    router.use('/products', productsRouter);
    router.use('/api/v1/users', usersRouter);
    router.use('/api/v1/categories', categoriesRouter);
}

module.exports = routerApi;